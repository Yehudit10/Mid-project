const express=require("express")
const UserController=require("../Controllers/UserControllers")
const router=express.Router()

router.get("/",UserController.getAllUsers)
router.get("/:id",UserController.getUserByID)
router.post("/",UserController.createUser)
router.put("/",UserController.updateUser)
router.delete("/",UserController.deleteUser)
module.exports=router