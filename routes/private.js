const express = require('express');
const router = express.Router();
const {getPrivateData} = require('../controllers/private');
const {protect} = require('../middleware/protect');
// const registerEvent = require("../controllers/event");

router.route("/").get(protect,getPrivateData);

// router.route("/registerEvent").post(registerEvent);

module.exports = router;    