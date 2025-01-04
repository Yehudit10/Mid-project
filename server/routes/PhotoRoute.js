const express=require("express")
const PhotoController=require("../Controllers/PhotoController")
const router=express.Router()
router.use(express.static("public"))
router.get("/",PhotoController.getAllPhotos)
router.post("/",PhotoController.createPhoto)
router.put("/",PhotoController.updatePhoto)
router.delete("/",PhotoController.deletePhoto)
module.exports=router