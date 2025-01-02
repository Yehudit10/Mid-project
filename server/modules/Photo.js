const mongoose=require("mongoose")
const photoSchema= new mongoose.Schema({
    imgUrl:{
        type:String,
        required:true
    },
    title:String
},{timestamps:true})
module.exports=mongoose.model('Photo',photoSchema)