const express = require("express");
const app = express();
const userRouter = require("./routers/userRouter");
const cors = require("cors");
const dotenv = require("dotenv");
const { Sequelize } = require('sequelize');

dotenv.config();

app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = process.env.PORT || 5001;

app.use("/user", userRouter);

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync().then(() => {
      app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
      });
    }).catch((err) => {
      console.log(err);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });