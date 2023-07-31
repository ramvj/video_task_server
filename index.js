const express = require("express");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const cors = require("cors");
var morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
require("dotenv").config();
// Body-parse Config
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());
app.use(fileUpload());
app.use(morgan("dev"));
const { Server } = require("socket.io");
const PORT = process.env.PORT || 5000;
// socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
module.exports = { io };
var rotues_res = require("./routes/index");
// path directory
app.use("/images", express.static(path.join(__dirname + `/uploads/`)));
// routes Access
app.use(rotues_res);
// Port listen
server.listen(PORT, () => console.log("Server is running on port 5000"));
// DB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/ramt")
  .then((res) => {
    console.log("DB connected");
  })
  .catch((error) => handleError(error));
