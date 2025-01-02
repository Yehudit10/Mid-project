const express=require("express")
const PostController=require("../Controllers/PostControllers")
const router=express.Router()

router.get("/",PostController.getAllPosts)
router.post("/",PostController.createPost)
router.get("/:id",PostController.getPostByID)
router.put("/",PostController.updatePost)
router.delete("/",PostController.deletePost)
module.exports=router