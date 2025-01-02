require("dotenv").config()
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const corsOptions=require("./config/corsOptions")
const connectToDB=require("./config/connectDB")
const app=express()
const PORT=process.env.PORT||4000
app.use(cors(corsOptions))
app.use(express.json())
app.use("/users",require("./routes/UserRoute"))
app.use("/posts",require("./routes/PostRoute"))
app.use("/todos",require("./routes/TodoRoute"))
app.use("/photos",require("./routes/PhotoRoute"))
connectToDB()
mongoose.connection.once('open',()=>{
    app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
})
mongoose.connection.on('error',(err)=>{
    if(err) throw err
})

