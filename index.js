// temp, vapour pressure, state,
// final_temp, final_vapour_pressure, final_state
//
//
//
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const deviceRouter = require("./Router/device");
const mongoose = require("mongoose");
app.use(express.json());
const start = async () => {
  try {
    // await connect(process.env.MONGO_URI);
    await mongoose.connect(process.env.url, {
      // userNewUrlParser: true,
      // useCurrentIndex: true,
      // useFindAndModify: true,
      // useUnifiedTopology: true,
    });
    console.log("connected to db");
  } catch (error) {
    

    console.log(`----------------- ${error}----------------`);
    }


};
app.use("/v1/", deviceRouter);
app.get("/", (req, res) => res.send("Hello is am Smart Device Backend!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
start();