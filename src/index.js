const express = require("express");
const app = express();
const userRouter = require("./routers/userRouter");
const mongoose = require("mongoose");

const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: "*" }));

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5001;

app.use("/user", userRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listning on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
