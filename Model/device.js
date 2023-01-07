const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    deviceName: {
      type: String,
      default: "",
      unique: true,
    },
    deviceState: {
      type: String,
      enum: [ "off", "running"],
    },
    parameters: {
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
