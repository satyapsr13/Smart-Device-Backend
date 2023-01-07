const router = require("express").Router();
const {
  getDeviceData,
  getDeviceData1,
  addDeviceData,
  allIsWell,
} = require("../Controller/device");
router.route("/getData").post(getDeviceData);
router.route("/getData1").post(getDeviceData1);
router.route("/addData/:id").post(addDeviceData);
router.route("/").get(allIsWell);
module.exports = router;
