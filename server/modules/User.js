const mongoose=require("mongoose")
const userScheme=new mongoose.Schema(
    {
        name:{
            type:String
        },
        userName:{
            type:String,
            default:"Guess"
        },
        email:{
            type:String
        },
        address:{
            type:String
        },
        phone:{
            type:String,
            maxLength:10
        }
    },{timestamps:true}
)
module.exports= mongoose.model('User',userScheme)