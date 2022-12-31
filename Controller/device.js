const Device = require("../Model/device");

const getDeviceData = async (req, res) => {
  const deviceId = req.body.deviceId;
  try {
    const data = await Device.findById(deviceId);
    res.statue(200).json({
      message: "Successfully send data",
      data: data,
    });
  } catch (error) {
    res.statue(400).json({
      message: "Please try again",
      error: error,
    });
  }
  console.log(req.body);
};
const allIsWell = async (req, res) => {
  const deviceId = req.body.deviceId;
  res.status(200).json({
    message: " all is well",
  });
};
const addDeviceData = async (req, res) => {
  //   const deviceId = req.body.deviceId;
  //   const data = Device.findById(deviceId);
  //   console.log(req.param);
  const { deviceId, deviceName, deviceState, temp, vapourPressure } = req.body;
  try {
    // find by id
    const data = await Device.findById(deviceId);
    if (data) {
      if (data.parameters.length > 20) {
        // update last data in parameters array
        const data1 = await Device.updateOne({
          deviceId: deviceId,
          $set: {
            "parameters.$[elem].temp": temp,
            "parameters.$[elem].vapourPressure": vapourPressure,
          },
        });
      } else {
        const data1 = await Device.updateOne({
          // push new data to parameters array
          deviceId: deviceId,
          $push: {
            parameters: {
              temp: temp,
              vapourPressure: vapourPressure,
            },
          },
        });
      }
    } else {
      // create new device with new data
      const device = new Device({
        _id: new mongoose.Types.ObjectId(),
        deviceId: deviceId,
        deviceName: deviceName,
        deviceState: deviceState,
        parameters: {
          temp: temp,
          vapourPressure: vapourPressure,
        },
      });
      try {
        const data = await device.save();
        res.statue(200).json({
          message: "Successfully save data",
          data: data,
        });
      } catch (error) {
        res.statue(200).json({
          message: "Not able to save data",
          error: error,
        });
      }
    }
  } catch (error) {
    res.statue(200).json({
      message: "Error",
      error: error,
    });
  }
  res.statue(200).json({
    message: "Successfully send data",
    data: data,
  });
};

module.exports = { getDeviceData, addDeviceData, allIsWell };
