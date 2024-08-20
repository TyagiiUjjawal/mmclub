import express from 'express';
import accountController from '../controllers/accountController';
import homeController from '../controllers/homeController';
import winGoController from '../controllers/winGoController';
import userController from '../controllers/userController';
import middlewareController from '../controllers/middlewareController';
import adminController from '../controllers/adminController';
import dailyController from '../controllers/dailyController';
import k5Controller from '../controllers/k5Controller';
import k3Controller from '../controllers/k3Controller';
import paymentController from '../controllers/paymentController';
import { google } from "googleapis";
import path from "path";
import axios from 'axios'
import connection from "../config/connectDB";


let router = express.Router();

const initWebRouter = (app) => {

    // page account
    router.get('/keFuMenu', accountController.keFuMenu);
    router.get('/login', accountController.loginPage);
    router.get('/register', accountController.registerPage);
    router.get('/forgot', accountController.forgotPage);
    router.post('/api/sent/otp/verify', accountController.verifyCode);
    router.post('/api/sent/otp/verify/reset', accountController.verifyCodePass);
    router.post('/api/resetPasword', accountController.forGotPassword);
    

const SCOPES = ["https://www.googleapis.com/auth/webmasters"];
const SITE_URL = "https://www.cricketwinner.com";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const key = {
  type: "service_account",
  project_id: "cricket-winner-431903",
  private_key_id: "fb00e7c9f5fcfa07df692c85dc7134cebce91de6",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDTt49kId94jvKR\nkpBKmtV7lE3xcLg3GowqcKwJ8XdpCbAO33e2123C1x2l0GvUttwRAn6wIwfuSGty\njFeYpd/m+5WKMyUjBc1dih9pLRn+8okozPjjYMBC7WC1XJHVXhdIpI9QYd+VWu8j\njNpCghgeZZY/0ckJuAGq/jYREI48Zgqw4ZXhvOgWxMznKllsa5kh4BqEkkJ0xFmI\nK8qUroPjZZOsMTfxkqhBxnXH++QPFpPwmwuklOsYDeEmBcZjDTp5zo1JJygn00Fh\nrF4rZIa7qcSrUGlFz9H5k/sMbgfR9MuDfiqN6Ybn3VeI7UV800twS+spwAJJJVNn\nQSDRPFMbAgMBAAECggEAA5CaLf3yBNYnWHMm0dLEmHWZUGDtASSFyqsmAm7Z619Z\n4w45Nk9vTjIQEjwtrKG9l926Y13botP+Vynsyam1WO7QiEivLeVJnXMXb05umx/b\nVmAJKs70vcvAbp1V6UlRzAvVS+2x9ZJX53nWLPuCy3Q7cOyn3W2HPalVILluI68u\nUYRACw05R9jczbw/Z0LtoyIkTilAZl0F5orOcDiRCZ7eiQVCcMKHNs1kq6DeIaez\nBXxNxQqU4H/xj20jHutBNRNLYpIzEaDAmJRrkooynE0tsousE0LSlKGgzLCEarq2\ni99FD/w+4k+KeCNaCak9UpOfn0XtzgfOMoZoG7kUXQKBgQD2mo3HM6SJHYtOvTXP\n0FbFO0aKLbSQxuuwvhM1hLYw39KJjRKxJzMxUiDzBeailQ7vz6Uu7Trf6TsKWw7X\ne8qKPUApTnShrb2ubTHGoRTsgfpv8fn3miYKDImJ6qWnglt3Dr/7LQdfylZ/jQNS\nx1X31cCFTVnrCRp4PRtZ/RC3jQKBgQDbyLYKdpZ++Lo2OXyRJbChxt5c4imKVIxj\nwe2rNgPdHr0cAqHXZvkMJPqoOCgaQ+ZPSzkUbfYw+m+IpIZKpFxLPqTJY8TR6dQZ\n5UeikawD5YWSuqTUDKiKsQXvJPUCagP7HtVmL0hCIQYkCPJf+QzQzfFPnSt+17za\n2yGR57rXRwKBgE2w3W/fpjuIckYJODXTdjLG/O81fQiLkt9o0pZuzBNTwHmTV0s2\nhVtJe5X0yvd3rHAC5BCHrp+yU+ZsT521o1av+1HIJNh26yZTwnXIc9YbEPJJsq2+\nA7PwxTgNE8lVOUml/Pe99O/JyDyBCYX/xObCkdetSeHRSWSOI9rS7nxVAoGAf7YX\noeja9pkNi2jIK4edJcRrfcmlnc4XbfhIZM6UXC76cIZPCN27JgVu6cUH+IswDy+E\n0Yw8HKXJnbsMld8ACnEyTBv/SIL5Trreb2b6b6E1hteR4+4fGchXzGjLPkXgXlHC\nawhakqKh8NqKDJ6phcPFzx9jIOe3w+zFiwT+mw0CgYEAhjo/GhRvAv6pJSNlxsAs\nDvBAge+vp/LYr7b3STTL6kofOpBwfjMKhSJwLxSg4o57+Q4piRRlcyjmqjjypZdD\nCv5pEiwGwXvfHVvyz9kQ8Z7gZWQfpnbeK36sLfkfqdTVcEMw7nc4ZkyyTq+a/J1i\nWDFktDWY9iUZVqKcryREHS0=\n-----END PRIVATE KEY-----\n",
  client_email: "cricket-winner@cricket-winner-431903.iam.gserviceaccount.com",
  client_id: "105577045280083350425",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/cricket-winner%40cricket-winner-431903.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

router.post('/api/cwTestApi', async (req, res) => {
  try {
    const auth = await authorize();
    const message = await submitSitemap(auth);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function authorize() {
  const { client_email, private_key } = key;
  const jwtClient = new google.auth.JWT(client_email, null, private_key, SCOPES);
  try {
    await jwtClient.authorize();
    return jwtClient;
  } catch (error) {
    throw new Error("Authorization failed: " + error.message);
  }
}

async function submitSitemap(auth) {
  const webmasters = google.webmasters({ version: "v3", auth });
  try {
    await webmasters.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: SITEMAP_URL,
    });
    return "Sitemap submitted successfully";
  } catch (err) {
    throw new Error(`Error submitting sitemap: ${err.message}`);
  }
}


    // page home
    router.get('/', (req, res) => {
        return res.redirect('/home');
    });
    router.get('/home', homeController.homePage);

    router.get('/checkIn', middlewareController, homeController.checkInPage);
    router.get('/checkDes', middlewareController, homeController.checkDes);
    router.get('/checkRecord', middlewareController, homeController.checkRecord);
    router.get('/wallet/transfer', middlewareController, homeController.transfer);

    router.get('/promotion', middlewareController, homeController.promotionPage);
    router.get('/promotion/myTeam', middlewareController, homeController.promotionmyTeamPage);
    router.get('/promotion/promotionDes', middlewareController, homeController.promotionDesPage);
    router.get('/promotion/tutorial', middlewareController, homeController.tutorialPage);
    router.get('/promotion/bonusrecord', middlewareController, homeController.bonusRecordPage);

    router.get('/wallet', middlewareController, homeController.walletPage);
    router.get('/wallet/recharge', middlewareController, homeController.rechargePage);
    router.get('/wallet/withdrawal', middlewareController, homeController.withdrawalPage);
    router.get('/wallet/rechargerecord', middlewareController, homeController.rechargerecordPage);
    router.get('/wallet/withdrawalrecord', middlewareController, homeController.withdrawalrecordPage);
    router.get('/wallet/addBank', middlewareController, homeController.addBank);

    router.get('/wallet/paynow/manual_upi', middlewareController, paymentController.initiateManualUPIPayment);
    router.get('/wallet/paynow/manual_usdt', middlewareController, paymentController.initiateManualUSDTPayment);
    router.post('/wallet/paynow/manual_upi_request', middlewareController, paymentController.addManualUPIPaymentRequest);
    router.post('/wallet/paynow/manual_usdt_request', middlewareController, paymentController.addManualUSDTPaymentRequest);
    router.post('/wallet/paynow/wowpay', middlewareController, paymentController.initiateWowPayPayment);
    router.post('/wallet/verify/wowpay', middlewareController, paymentController.verifyWowPayPayment);
    router.get('/wallet/verify/wowpay', middlewareController, paymentController.verifyWowPayPayment);
    router.post('/wallet/paynow/upi', middlewareController, paymentController.initiateUPIPayment);
    router.get('/wallet/verify/upi', middlewareController, paymentController.verifyUPIPayment);

    router.get('/mian', middlewareController, homeController.mianPage);

    router.get('/recordsalary', middlewareController, homeController.recordsalary);
    router.get('/getrecord', middlewareController, homeController.getSalaryRecord);
    router.get('/about', middlewareController, homeController.aboutPage);
    router.get('/redenvelopes', middlewareController, homeController.redenvelopes);
    router.get('/mian/forgot', middlewareController, homeController.forgot);
    router.get('/newtutorial', homeController.newtutorial);
    router.get('/about/privacyPolicy', middlewareController, homeController.privacyPolicy);
    router.get('/about/riskAgreement', middlewareController, homeController.riskAgreement);

    router.get('/myProfile', middlewareController, homeController.myProfilePage);



    // BET wingo
    router.get('/win', middlewareController, winGoController.winGoPage);
    router.get('/win/3', middlewareController, winGoController.winGoPage3);
    router.get('/win/5', middlewareController, winGoController.winGoPage5);
    router.get('/win/10', middlewareController, winGoController.winGoPage10);

    // BET K5D
    router.get('/5d', middlewareController, k5Controller.K5DPage);
    router.post('/api/webapi/action/5d/join', middlewareController, k5Controller.betK5D); // register
    router.post('/api/webapi/5d/GetNoaverageEmerdList', middlewareController, k5Controller.listOrderOld); // register
    router.post('/api/webapi/5d/GetMyEmerdList', middlewareController, k5Controller.GetMyEmerdList); // register

    // BET K3
    router.get('/k3', middlewareController, k3Controller.K3Page);

    router.post('/api/webapi/action/k3/join', middlewareController, k3Controller.betK3); // register
    router.post('/api/webapi/k3/GetNoaverageEmerdList', middlewareController, k3Controller.listOrderOld); // register
    router.post('/api/webapi/k3/GetMyEmerdList', middlewareController, k3Controller.GetMyEmerdList); // register


    // login | register 
    router.post('/api/webapi/login', accountController.login); // login
    router.post('/api/webapi/register', accountController.register); // register
    router.get('/aviator', middlewareController, userController.aviator);
    router.get('/api/webapi/GetUserInfo', middlewareController, userController.userInfo); // get info account
    router.put('/api/webapi/change/userInfo', middlewareController, userController.changeUser); // get info account
    router.put('/api/webapi/change/pass', middlewareController, userController.changePassword); // get info account

    // bet wingo
    router.post('/api/webapi/action/join', middlewareController, winGoController.betWinGo); // register
    router.post('/api/webapi/GetNoaverageEmerdList', middlewareController, winGoController.listOrderOld); // register
    router.post('/api/webapi/GetMyEmerdList', middlewareController, winGoController.GetMyEmerdList); // register


    // promotion
    router.post('/api/webapi/promotion', middlewareController, userController.promotion); // register
    router.post('/api/webapi/checkIn', middlewareController, userController.checkInHandling); // register
    router.post('/api/webapi/check/Info', middlewareController, userController.infoUserBank); // register
    router.post('/api/webapi/addBank', middlewareController, userController.addBank); // register
    router.post('/api/webapi/otp', middlewareController, userController.verifyCode); // register
    router.post('/api/webapi/use/redenvelope', middlewareController, userController.useRedenvelope); // register

    // wallet
    router.post('/api/webapi/recharge', middlewareController, userController.recharge);
    router.post('/api/webapi/save_utr',userController.saveUtrController);
    router.post('/api/webapi/cancel_recharge', middlewareController, userController.cancelRecharge); // register
    router.post('/wowpay/create', middlewareController, userController.wowpay);
    router.post('/api/webapi/confirm_recharge', middlewareController, userController.confirmRecharge);
    router.get('/api/webapi/myTeam', middlewareController, userController.listMyTeam); // register
    router.get('/api/webapi/recharge/list', middlewareController, userController.listRecharge); // register
    router.get('/api/webapi/withdraw/list', middlewareController, userController.listWithdraw); // register
    router.post('/api/webapi/recharge/check', middlewareController, userController.recharge2); // register
    router.post('/api/webapi/withdrawal', middlewareController, userController.withdrawal3); // register
    router.post('/api/webapi/callback_bank', middlewareController, userController.callback_bank); // register
    router.post('/api/webapi/recharge/update', middlewareController, userController.updateRecharge); // update recharge
    router.post('/api/webapi/transfer', middlewareController, userController.transfer); // register
    router.get('/api/webapi/transfer_history', middlewareController, userController.transferHistory); //
    router.get('/api/webapi/confirm_recharge_usdt', middlewareController, userController.confirmUSDTRecharge); //
    router.post('/api/webapi/confirm_recharge_usdt', middlewareController, userController.confirmUSDTRecharge); //

    router.post('/api/webapi/search', middlewareController, userController.search); // register


    // daily
    router.get('/manager/index', dailyController.middlewareDailyController, dailyController.dailyPage);
    router.get('/manager/listRecharge', dailyController.middlewareDailyController, dailyController.listRecharge);
    router.get('/manager/listWithdraw', dailyController.middlewareDailyController, dailyController.listWithdraw);
    router.get('/manager/members', dailyController.middlewareDailyController, dailyController.listMeber);
    router.get('/manager/profileMember', dailyController.middlewareDailyController, dailyController.profileMember);
    router.get('/manager/settings', dailyController.middlewareDailyController, dailyController.settingPage);
    router.get('/manager/gifts', dailyController.middlewareDailyController, dailyController.giftPage);
    router.get('/manager/support', dailyController.middlewareDailyController, dailyController.support);
    router.get('/manager/member/info/:phone', dailyController.middlewareDailyController, dailyController.pageInfo);

    router.post('/manager/member/info/:phone', dailyController.middlewareDailyController, dailyController.userInfo);
    router.post('/manager/member/listRecharge/:phone', dailyController.middlewareDailyController, dailyController.listRechargeMem);
    router.post('/manager/member/listWithdraw/:phone', dailyController.middlewareDailyController, dailyController.listWithdrawMem);
    router.post('/manager/member/redenvelope/:phone', dailyController.middlewareDailyController, dailyController.listRedenvelope);
    router.post('/manager/member/bet/:phone', dailyController.middlewareDailyController, dailyController.listBet);


    router.post('/manager/settings/list', dailyController.middlewareDailyController, dailyController.settings);
    router.post('/manager/createBonus', dailyController.middlewareDailyController, dailyController.createBonus);
    router.post('/manager/listRedenvelops', dailyController.middlewareDailyController, dailyController.listRedenvelops);

    router.post('/manager/listRecharge', dailyController.middlewareDailyController, dailyController.listRechargeP);
    router.post('/manager/listWithdraw', dailyController.middlewareDailyController, dailyController.listWithdrawP);

    router.post('/api/webapi/statistical', dailyController.middlewareDailyController, dailyController.statistical);
    router.post('/manager/infoCtv', dailyController.middlewareDailyController, dailyController.infoCtv); // get info account
    router.post('/manager/infoCtv/select', dailyController.middlewareDailyController, dailyController.infoCtv2); // get info account
    router.post('/api/webapi/manager/listMember', dailyController.middlewareDailyController, dailyController.listMember); // get info account

    router.post('/api/webapi/manager/buff', dailyController.middlewareDailyController, dailyController.buffMoney); // get info account


    // admin
    router.get('/admin/manager/index', adminController.middlewareAdminController, adminController.adminPage); // get info account
    router.get('/admin/manager/index/3', adminController.middlewareAdminController, adminController.adminPage3); // get info account
    router.get('/admin/manager/index/5', adminController.middlewareAdminController, adminController.adminPage5); // get info account
    router.get('/admin/manager/index/10', adminController.middlewareAdminController, adminController.adminPage10); // get info account

    router.get('/admin/manager/5d', adminController.middlewareAdminController, adminController.adminPage5d); // get info account
    router.get('/admin/manager/k3', adminController.middlewareAdminController, adminController.adminPageK3); // get info account

    router.get('/admin/manager/rechargeRequests', adminController.middlewareAdminController, adminController.rechargeRequestsPage); // get info account
    router.get('/admin/manager/members', adminController.middlewareAdminController, adminController.membersPage); // get info account
    router.get('/admin/manager/createBonus', adminController.middlewareAdminController, adminController.giftPage); // get info account
    router.get('/admin/manager/ctv', adminController.middlewareAdminController, adminController.ctvPage); // get info account
    router.get('/admin/manager/ctv/profile/:phone', adminController.middlewareAdminController, adminController.ctvProfilePage); // get info account

    router.get('/admin/manager/settings', adminController.middlewareAdminController, adminController.settings); // get info account
    router.get('/admin/manager/listRedenvelops', adminController.middlewareAdminController, adminController.listRedenvelops); // get info account
    router.post('/admin/manager/infoCtv', adminController.middlewareAdminController, adminController.infoCtv); // get info account
    router.post('/admin/manager/infoCtv/select', adminController.middlewareAdminController, adminController.infoCtv2); // get info account
    router.post('/admin/manager/settings/bank', adminController.middlewareAdminController, adminController.settingBank); // get info account
    router.post('/admin/manager/settings/cskh', adminController.middlewareAdminController, adminController.settingCskh); // get info account
    router.post('/admin/manager/settings/buff', adminController.middlewareAdminController, adminController.settingbuff); // get info account
    router.post('/admin/manager/create/ctv', adminController.register); // get info account
    router.post('/admin/manager/settings/get', adminController.middlewareAdminController, adminController.settingGet); // get info account
    router.post('/admin/manager/createBonus', adminController.middlewareAdminController, adminController.createBonus); // get info account

    router.post('/admin/member/listRecharge/:phone', adminController.middlewareAdminController, adminController.listRechargeMem);
    router.post('/admin/member/listWithdraw/:phone', adminController.middlewareAdminController, adminController.listWithdrawMem);
    router.post('/admin/member/redenvelope/:phone', adminController.middlewareAdminController, adminController.listRedenvelope);
    router.post('/admin/member/bet/:phone', adminController.middlewareAdminController, adminController.listBet);


    router.get('/admin/manager/recharge', adminController.middlewareAdminController, adminController.rechargePage); // get info account
    router.get('/admin/manager/withdraw', adminController.middlewareAdminController, adminController.withdraw); // get info account
    // router.get('/admin/manager/level', adminController.middlewareAdminController, adminController.level); // get info account
    router.get('/admin/manager/levelSetting', adminController.middlewareAdminController, adminController.levelSetting);
    router.get('/admin/manager/CreatedSalaryRecord', adminController.middlewareAdminController, adminController.CreatedSalaryRecord);
    router.get('/admin/manager/rechargeRecord', adminController.middlewareAdminController, adminController.rechargeRecord); // get info account
    router.get('/admin/manager/withdrawRecord', adminController.middlewareAdminController, adminController.withdrawRecord); // get info account
    router.get('/admin/manager/statistical', adminController.middlewareAdminController, adminController.statistical); // get info account
    router.get('/admin/member/info/:id', adminController.middlewareAdminController, adminController.infoMember);
    router.get('/api/webapi/admin/getLevelInfo', adminController.middlewareAdminController, adminController.getLevelInfo);
    router.get('/api/webapi/admin/getSalary', adminController.middlewareAdminController, adminController.getSalary);

    router.post('/api/webapi/admin/updateLevel', adminController.middlewareAdminController, adminController.updateLevel); // get info account
    router.post('/api/webapi/admin/CreatedSalary', adminController.middlewareAdminController, adminController.CreatedSalary); // get info account
    router.post('/api/webapi/admin/listMember', adminController.middlewareAdminController, adminController.listMember); // get info account
    router.post('/api/webapi/admin/listctv', adminController.middlewareAdminController, adminController.listCTV); // get info account
    router.post('/api/webapi/admin/withdraw', adminController.middlewareAdminController, adminController.handlWithdraw); // get info account
    router.post('/api/webapi/admin/recharge', adminController.middlewareAdminController, adminController.recharge); // get info account
    router.post('/api/webapi/admin/rechargeDuyet', adminController.middlewareAdminController, adminController.rechargeDuyet); // get info account
    router.post('/api/webapi/admin/member/info', adminController.middlewareAdminController, adminController.userInfo); // get info account
    router.post('/api/webapi/admin/statistical', adminController.middlewareAdminController, adminController.statistical2); // get info account

    router.post('/api/webapi/admin/banned', adminController.middlewareAdminController, adminController.banned); // get info account


    router.post('/api/webapi/admin/totalJoin', adminController.middlewareAdminController, adminController.totalJoin); // get info account
    router.post('/api/webapi/admin/change', adminController.middlewareAdminController, adminController.changeAdmin); // get info account
    router.post('/api/webapi/admin/profileUser', adminController.middlewareAdminController, adminController.profileUser); // get info account

    // admin 5d 
    router.post('/api/webapi/admin/5d/listOrders', adminController.middlewareAdminController, adminController.listOrderOld); // get info account
    router.post('/api/webapi/admin/k3/listOrders', adminController.middlewareAdminController, adminController.listOrderOldK3); // get info account
    router.post('/api/webapi/admin/5d/editResult', adminController.middlewareAdminController, adminController.editResult); // get info account
    router.post('/api/webapi/admin/k3/editResult', adminController.middlewareAdminController, adminController.editResult2); // get info account
    app.post('/save-payment', async (req, res) => {
      const { uniqueNumber, amount } = req.body;
      let auth = req.cookies.auth;
  
      if (!auth) {
          return res.status(401).send('Unauthorized');
      }
  
      try {
          // Query to get the user's phone number based on the token
          const [user] = await connection.query('SELECT `phone` FROM users WHERE `token` = ?', [auth]);
  
          if (user.length === 0) {
              return res.status(401).send('Unauthorized');
          }
  
          const phone = user[0].phone;
  
          // Insert payment data with status 'Pending' into rechargeRequests table
          const sql = 'INSERT INTO rechargeRequests (mobileNumber, uniqueNumber, status, amount) VALUES (?, ?, ?, ?)';
          await connection.query(sql, [phone, uniqueNumber, 'Pending', amount]);
  
          res.json({ message: 'Data saved successfully' });
      } catch (err) {
          console.error('Error saving data:', err);
          res.status(500).json({ message: 'Error saving data' });
      }
  });
   
   
  router.get('/api/recharges', async (req, res) => {
    let auth = req.cookies.auth;

    if (!auth) {
        return res.status(401).send('Unauthorized');
    }

    try {
        // Query to get the user's phone number based on the token
        const [user] = await connection.query('SELECT `phone` FROM users WHERE `token` = ?', [auth]);

        if (user.length === 0) {
            return res.status(401).send('Unauthorized');
        }

        const phone = user[0].phone;

        // Query to fetch recharge records filtered by the user's phone number and ordered by timestamp (most recent first)
        const [recharges] = await connection.query(
            'SELECT mobileNumber, amount, status, utrNumber,timestamp FROM rechargeRequests WHERE mobileNumber = ? ORDER BY timestamp DESC',
            [phone]
        );

        res.json(recharges);
    } catch (err) {
        console.error('Error fetching recharges:', err);
        res.status(500).json({ message: 'Error fetching recharges' });
    }
});

    return app.use('/', router);
}

module.exports = {
    initWebRouter,
};