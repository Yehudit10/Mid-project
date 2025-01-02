const mongoose=require("mongoose")
const TodoScheme=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        tags:[String],
        completed:{
            type:Boolean,
            default:false
        }
    },{
        timestamps:true
    }
)
module.exports=mongoose.model('Todo',TodoScheme)