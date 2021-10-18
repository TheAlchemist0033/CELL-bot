 
const mongoose = require("mongoose")
	  const servConfig = mongoose.Schema({
	    ServerId:String,
      Prefix:String,
      LogChannel:String,
      
      Owner:String,
      Admin:Array,
		  Exists:Number
	})
module.exports = mongoose.model("serverConf", servConfig)
