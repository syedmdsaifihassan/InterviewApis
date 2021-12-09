const express = require("express");
const router = express.Router();

const {addMeeting,allMeeting,scheduleMeeting,updateMeeting,deleteMeeting} = require("../controller/meetings");

router.post("/addMeeting", addMeeting);
router.get("/allMeeting", allMeeting);
router.get("/scheduleMeeting", scheduleMeeting);
router.post("/updateMeeting", updateMeeting);
router.delete("/deleteMeeting", deleteMeeting);

module.exports = router;