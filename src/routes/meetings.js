const express = require("express");
const router = express.Router();

const {addMeeting,allMeeting,scheduleMeeting,updateMeeting} = require("../controller/meetings");

router.post("/addMeeting", addMeeting);
router.get("/allMeeting", allMeeting);
// router.get("/scheduleMeeting", scheduleMeeting);
// router.get("/updateMeeting", updateMeeting);

module.exports = router;
