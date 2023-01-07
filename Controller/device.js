const Device = require("../Model/device");

const getDeviceData = async (req, res) => {
  const deviceId = req.body.deviceId;
  if (!deviceId) {
    res.status(400).json({
      message: "Please provide device id",
    });
  }

  console.log(req.body);
  try {
    // const data = await Device.
    // get all data
    const data = await Device.find({
      // deviceId: deviceId,
    });
    if (!data) {
      res.status(200).json({
        message: "No data found for this device Id",
        deviceId: deviceId,
      });
    } else {
      res.status(200).json({
        message: "Successfully send data",
        data: data,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Please try again",
      error: error,
    });
  }
};

const getDeviceData1 = async (req, res) => {
  console.log(req.body);
  try {
    // const data = await Device.
    // get all data
    const data = await Device.find();
    console.log(`--------- ${data}-----------`);
    res.status(200).json({
      message: "Successfully retrieve data",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Please try again",
      error: error,
    });
  }
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
  // const id = req.param.id;
  const id = req.params.id;
  // console.log(req);

  try {
    const data = await Device.findById();

    if (data) {
      console.log(`----------${data}`);

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
      console.log("inside else case");
      try {
        const device = new Device({
          // _id: new mongoose.Types.ObjectId(),
          // deviceId: deviceId,
          deviceName: deviceName,
          deviceState: deviceState,
          parameters: {
            temp: temp,
            vapourPressure: vapourPressure,
          },
        });

        console.log(device);
        const data = await device.save();
        res.status(200).json({
          message: "Successfully save data",
          data: data,
        });
      } catch (error) {
        res.status(400).json({
          message: "Data does not save",
          error: error,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error,
    });
  }
};

module.exports = { getDeviceData, addDeviceData, allIsWell, getDeviceData1 };
