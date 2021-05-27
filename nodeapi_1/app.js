const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/nodeapi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected!!!");
  });

mongoose.connection.on("error", (err) => {
  console.log(`DB Connection error: ${err.message}`);
});
const projectRoutes = require("./routes/project");
app.use("/", projectRoutes);
