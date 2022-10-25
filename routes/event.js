const express = require('express');
const router = express.Router();
const {deleteEvent,eachData,registerEvent, eventData, UpdateEvent,Myinvitation} = require("../controllers/event");

router.route("/register_Event").post(registerEvent);

router.route("/events").get(eventData);
router.route('/events/:_id').get(eachData);
router.route("/put/:id").put(UpdateEvent);
router.route("/myinvitation/:userId").get(Myinvitation);
router.route("/deleteEvent/:id").delete(deleteEvent);

  
module.exports = router;
// export default router