const Device = require("../Model/device");
const mongoose = require("mongoose");
const getDeviceData = async (req, res) => {
  const deviceName = req.body.deviceName;
  if (!deviceName) {
    res.status(400).json({
      message: "Please provide device name",
    });
  }

  console.log(req.body);
  try {
    // const data = await Device.
    // get all data
    const data = await Device.findOne({
      deviceName: deviceName,
    });
    if (!data) {
      res.status(200).json({
        message: `No data found for this device ${deviceName}`,
      });
    } else {
      res.status(200).json({
        message: "Successfully retrieve data",
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

const allIsWell = async (_, res) => {
  res.status(200).json({
    message: " all is well",
  });
};
const addDeviceData = async (req, res) => {
  const { deviceName, deviceState, temp, vapourPressure } = req.body;

  try {
    // const data = await Device.findById({ id: req.params.id });
    const data = await Device.findOne({ deviceName: deviceName });

    console.log(`---------68----------${data}`);

    if (data) {
      console.log(`-----70-----${data}`);
      if (data.parameters.length > 200) {
        // update last data in parameters array
        const data1 = await Device.updateOne(
          { _id: req.params.id },
          {
            $set: {
              "parameters[19].temp": temp,
              "parameters[19].vapourPressure": vapourPressure,
            },
          }
        );
      } else {
        const data1 = await Device.updateOne(
          // { _id: req.params.id },
          { deviceName: deviceName },
          {
            $push: {
              parameters: {
                temp: temp,
                vapourPressure: vapourPressure,
              },
            },
          }
        );
        res.status(200).json({
          message: " successfully added",
          data: data1,
        });
      }
    } else {
      // create new device with new data
      console.log("inside else case");
      try {
        const device = new Device({
          _id: new mongoose.Types.ObjectId(),
          // deviceId: deviceId,
          deviceName: deviceName,
          deviceState: deviceState,
          parameters: {
            temp: temp,
            vapourPressure: vapourPressure,
          },
        });

        const data = await device.save();

        console.log(`----------121----${data}-------------`);
        res.status(200).json({
          message: "Successfully added new data",
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
      message: "Error 138",
      error: error,
    });
  }
};

module.exports = { getDeviceData, addDeviceData, allIsWell, getDeviceData1 };
