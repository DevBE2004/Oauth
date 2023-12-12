const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/dbconnect")();
require("./passport");
const initRouter = require("./routers");

const app = express();

const PORT = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("SERVER ON !");
});

initRouter(app);

app.listen(5000, () => {
  console.log(`server on: http://localhost:${PORT}`);
});
