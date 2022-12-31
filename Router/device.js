const router = require("express").Router();
const {
  getDeviceData,
  addDeviceData,
  allIsWell,
} = require("../Controller/device");
router.route("/getData").post(getDeviceData);
router.route("/addData").post(addDeviceData);
router.route("/").get(allIsWell);
module.exports = router;
