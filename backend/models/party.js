const mongoose = require("mongoose");
const partySchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
       
    },
    partyDate:{
        type:Date
    },
    privacy:{
        type: Boolean
    },
    photos:[{
        type:String
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    
      }

})

const Party = mongoose.model("Party" , partySchema)

module.exports = Party