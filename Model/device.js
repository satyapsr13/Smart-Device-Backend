const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceSchema = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    deviceName: {
      type: String,
      default: "",
    },

    deviceId: {
      type: Number,
      required: true,
      unique: true,
    },

    deviceState: {
      type: String,
      enum: ["active", "off", "running"],
    },

    parameters: {
      // list of Parameter objects
      type: [
        {
          temp: {
            type: Number,
            default: 0,
          },
          vapourPressure: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Device", deviceSchema);
