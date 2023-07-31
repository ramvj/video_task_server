const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskTableSchema = Schema({
  title: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  video_path: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = TaskTable = mongoose.model("video", TaskTableSchema);
