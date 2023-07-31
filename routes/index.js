var express = require("express");
var router = express.Router();
const TaskTable = require("../model/task/index");
var video_route = require("../controller/control/index");
const { io } = require("../index");
// socket.io connections
io.on("connection", async (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("single_video", async function (id) {
    try {
      const messages = await TaskTable.findOne({ isActive: true, _id: id });
      console.log(messages);
      socket.emit("video_get_single_data", messages);
    } catch (err) {
      // Handle this error properly.
      console.error(err);
    }
  });

  try {
    const messages = await TaskTable.find({ isActive: true });

    socket.emit("video_getdata", messages);
  } catch (err) {
    // Handle this error properly.
    console.error(err);
  }
});

router.post("/video_save", video_route.savevideo);
// router.get("/savesss",video_route.getvideo);
// router.get("/savesss/:id",video_route.getvideo);

module.exports = router;
