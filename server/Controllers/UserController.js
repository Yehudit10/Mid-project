const User=require("../modules/User")
const getAllUsers=async(req,res)=>{
    const {sort,update_date_start,update_date_end}=req.query 
    const query={updatedAt:{$lte:new Date(update_date_end||new Date()),$gte:new Date(update_date_start||0)}}     
    const users=await User.find(query).sort(sort||"_id").lean()
if(!users)
    return res.status(400).send("no users")
res.json(users)
}
const getUserByID=async(req,res)=>{
    const {id}=req.params
    const user=await User.findById(id).lean()
    if(!user)
        return res.status(400).send("no user")
    res.json(user)
    }
    const createUser=async(req,res)=>{
        
     const {name,userName,email,address,phone}=req.body
     const existingUser=await User.findOne({userName:userName}).lean()
     if(existingUser)
       return res.status(400).send("user name already exists")
     const user=await User.create({name,userName,email,address,phone})
     if(!user)
        return res.status(400).send("create failed")
       getAllUsers(req,res)
    }
    const updateUser=async(req,res)=>{
        console.log(req.body)
        const {_id,name,userName,email,address,phone}=req.body
        if(!_id)
            return res.status(400).send("id is required")
        const user=await User.findById(_id).exec()
        if(!user)
           return res.status(400).send("no user")
        user.name=name
        user.userName=userName
        user.email=email
        user.address=address
        user.phone=phone
        const savedUser=await user.save()
        if(!savedUser)
            return res.status(400).send("update failed")
            getAllUsers(req,res)

       }
       const deleteUser=async(req,res)=>{
        const {id}=req.body
        if(!id)
            return res.status(400).send("id is required")
        const user=await User.findById(id).exec()
        if(!user)
           return res.status(400).send("no such user")
        await user.deleteOne()
        getAllUsers(req,res)

       }
module.exports={getAllUsers,getUserByID,createUser,updateUser,deleteUser}