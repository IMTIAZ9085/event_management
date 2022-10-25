const express = require('express');
const router = express.Router();
const {
      Finduser,
      register,
      login,
      forgetPassword,
      resetPassword,
      invited, 
      Allusers
} = require("../controllers/auth");

router.route("/register").post(register); 
router.route("/owner/:email").get(Finduser);
router.route("/login").post(login);
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword/:resetToken").put(resetPassword);
router.route("/invited/:_id").put(invited);
router.route("/users").get(Allusers);

module.exports = router;