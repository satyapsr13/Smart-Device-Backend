// temp, vapour pressure, state,
// final_temp, final_vapour_pressure, final_state
//
//
//
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const deviceRouter = require("./Router/device");
app.use(express.json());
app.use("/v1/", deviceRouter);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
