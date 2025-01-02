const mongoose=require("mongoose")
const postScheme=new mongoose.Schema(
    {
        title:{
            type:String,
        required:true
        },
        body:String
    },{
        timestamps:true
    }
)
module.exports=mongoose.model('Post',postScheme)