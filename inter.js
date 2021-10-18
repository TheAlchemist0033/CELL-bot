const mongoose = require("mongoose")
          const hack = mongoose.Schema({
            ServerId:String,
            Antagonist:String,
            Victim:String,
            Exists:Number
        })
module.exports = mongoose.model("interrupt", hack)
