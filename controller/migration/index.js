const TaskTable = require("../../model/task/index.js");
const path = require("path");

var resultSet;
const save_video = async (req, res, next) => {
  if (req != "" && typeof req !== "undefined") {
    try {
      if (req.files) {
        var video_path;
        video_path = req.files.video_path;
        var datetimestamp = Math.floor(Math.random() * 10000000000000000);
        video_path.mv(
          path.join(
            __dirname +
              `../../../uploads/${
                datetimestamp +
                "." +
                video_path.name.split(".")[
                  video_path.name.split(".").length - 1
                ]
              }`
          ),
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
          }
        );

        video_path =
          datetimestamp +
          "." +
          video_path.name.split(".")[video_path.name.split(".").length - 1];

        var thumbnail;
        thumbnail = req.files.thumbnail;
        var datetimestamp = Math.floor(Math.random() * 10000000000000000);
        thumbnail.mv(
          path.join(
            __dirname +
              `../../../uploads/${
                datetimestamp +
                "." +
                thumbnail.name.split(".")[thumbnail.name.split(".").length - 1]
              }`
          ),
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
          }
        );

        thumbnail =
          datetimestamp +
          "." +
          thumbnail.name.split(".")[thumbnail.name.split(".").length - 1];

        var data = new TaskTable(req.body);
        data.video_path = video_path;
        data.thumbnail = thumbnail;

        if (req.body) {
          await data
            .save()
            .then((result) => {
              resultSet = { msg: "successufully submitted", statuscode: 200 };
            })
            .catch((err) => {
              console.log("err: ", err);
              resultSet = { msg: err.message, statuscode: 500 };
            });
        }
      }

      return resultSet;
    } catch (Error) {
      resultSet = { msg: Error, statuscode: 500 };
      return resultSet;
    }
  } else {
    resultSet = { msg: "No direct Access Allowed", statuscode: 500 };
    return resultSet;
  }

  console.log("success");
};

const getvideo = async (req, res, next) => {
  if (req != "" && typeof req !== "undefined") {
    try {
      let data;

      if (typeof req.params.id !== "undefined") {
        data = await TaskTable.findOne({ isActive: true, _id: req.params.id });
      } else {
        data = await TaskTable.find({ isActive: true });
      }
      let result_data = data;
      resultSet = { msg: "success", list: result_data, statuscode: 200 };
      return resultSet;
    } catch (Error) {
      resultSet = { msg: Error, statuscode: 500 };
      return resultSet;
    }
  } else {
    resultSet = { msg: "No direct Access Allowed", statuscode: 500 };
    return resultSet;
  }
};

module.exports = { save_video, getvideo };
