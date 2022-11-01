const express = require("express");
const router = express.Router();

const {
  register,
  login,
  dashboard,
  isAuthuser,
  logout,
  updatePassword,
  updateProfile,
  profilepic,
  ordercapture,
  orde,
  registerrtest,
  pay,
  paym,
  buyStripePaymentSubscription,
  validateStripePayment,
  addCard

} = require("../controllers/auth");
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(isAuthuser, dashboard);
router.route("/buyStripePaymentSubscription").post(buyStripePaymentSubscription);
router.route("/logout").get(logout);
router.route("/update/password").put(isAuthuser, updatePassword);
router.route("/update/profile").put(isAuthuser, updateProfile);
router.route("/addcard").post(addCard);
router.route("/listcard").post(listCard);

// router.route("/pay").post(pay);
// router.route("/test").get(test)
// router.route("/order/:orderID/capture").post(ordercapture);
// router.route("/order").post(ordertest);
// router.route("/update/profilepic").put(isAuthuser, profilepic);


// 



module.exports = router;