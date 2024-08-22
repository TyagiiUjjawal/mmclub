import "dotenv/config";

import express from "express";
import configViewEngine from "./config/configEngine";
import routes from "./routes/web";
import cronJobContronler from "./controllers/cronJobContronler";
import socketIoController from "./controllers/socketIoController";
import connection from "./config/connectDB";

let cookieParser = require("cookie-parser");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 3000;

app.use(cookieParser());
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/webapi/admin/approveRequest", async (req, res) => {
  const { id, amount } = req.body;

  console.log(`Approving request with ID: ${id}, Amount: ${amount}`);

  try {
    // Update rechargeRequests table
    const [result] = await connection.execute(
      "UPDATE rechargeRequests SET amount = ?, status = ? WHERE id = ?",
      [amount, "Completed", id]
    );

    if (result.affectedRows === 0) {
      throw new Error("No rows updated. Check if the ID exists.");
    }

    // Get the mobile number associated with the request
    const [rows] = await connection.execute(
      "SELECT mobileNumber FROM rechargeRequests WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      throw new Error("No such request found.");
    }

    const mobileNumber = rows[0].mobileNumber;

    // Check if the user has made any previous deposits
    const [userDeposits] = await connection.execute(
      "SELECT COUNT(*) AS depositCount FROM rechargeRequests WHERE mobileNumber = ? AND status = ?",
      [mobileNumber, "Completed"]
    );

    const isFirstDeposit = userDeposits[0].depositCount === 1;

    // Increment the amount by 5% if it's the first deposit
    let finalAmount = amount;
    if (isFirstDeposit) {
      finalAmount = amount * 1.05;
      console.log(
        `First deposit detected. Incremented amount by 5% to: ${finalAmount}`
      );
    }

    // Update users table
    await connection.execute(
      "UPDATE users SET money = money + ? WHERE phone = ?",
      [finalAmount, mobileNumber]
    );

    console.log(
      `Request approved successfully for mobile number: ${mobileNumber} with final amount: ${finalAmount}`
    );

    // Referral logic for first deposit only
    if (isFirstDeposit) {
      // Get the referrer
      const [referrer] = await connection.execute(
        "SELECT invite FROM users WHERE phone = ?",
        [mobileNumber]
      );

      if (referrer.length > 0) {
        const referrerCode = referrer[0].invite;

        const [ref] = await connection.execute(
          "SELECT phone FROM users WHERE code = ?",
          [referrerCode]
        );

        if (ref.length > 0) {
          const referrerPhone = ref[0].phone;
          const referralBonus = amount * 0.05; // 5% of the deposit

          // Update referrer's money and commission fields
          await connection.execute(
            "UPDATE users SET money = money + ?, roses_f1 = roses_f1 + ?, roses_today = roses_today + ? WHERE phone = ?",
            [referralBonus, referralBonus, referralBonus, referrerPhone]
          );

          console.log(
            `Transferred ${referralBonus} to first-level referrer: ${referrerPhone}`
          );
        }
      }
    }

    res.json({ success: true, message: "Request approved successfully." });
  } catch (error) {
    console.error("Error in approving request:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating the database.",
      error: error.message,
    });
  } finally {
    console.log("End of request processing.");
  }
});

// setup viewEngine
configViewEngine(app);
// init Web Routes
routes.initWebRouter(app);

// Cron game 1 Phut
cronJobContronler.cronJobGame1p(io);

// Check xem ai connect vào sever
socketIoController.sendMessageAdmin(io);

// app.all('*', (req, res) => {
//     return res.render("404.ejs");
// });

server.listen(port, "0.0.0.0", () => {
  console.log(`Connected successfully on port: ${port}`);
});
