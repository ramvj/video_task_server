var migration = require("../migration/index.js")

const savevideo = async(req,res,next)=>{
    var data = await migration.save_video(req)
    res.status(data.statuscode).send(data)
}
const getvideo = async(req,res,next)=>{
    var data = await migration.getvideo(req)
    res.status(data.statuscode).send(data)
}

module.exports={savevideo,getvideo}