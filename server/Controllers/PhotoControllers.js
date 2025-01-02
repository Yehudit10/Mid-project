
const Photo=require("../modules/Photo")

const getAllPhotos=async(req,res)=>{
    const photos=await Photo.find().sort({_id:1}).lean()
    if(!photos)
        return res.status(400).send("no photos")
    res.json(photos)
}
const createPhoto=async(req,res)=>{
    const {imgUrl,title}=req.body
    if(!imgUrl)
       return res.status(400).send("imgUrl is required")
    const photo=await Photo.create({imgUrl,title})
    if(!photo)
       return res.status(400).send("create failed")
       const photos=await Photo.find().sort({_id:1}).lean()
       if(!photos)
           return res.status(400).send("no photos")
       res.json(photos)
   }
   const updatePhoto=async(req,res)=>{
       const {_id,imgUrl,title}=req.body
       if(!_id||!imgUrl)
           return res.status(400).send("id and imgUrl are required")
       const photo=await Photo.findById(_id).exec()
       if(!photo)
          return res.status(400).send("no photo")
       photo.title=title
       photo.imgUrl=imgUrl
       const savedPhoto=await photo.save()
       if(!savedPhoto)
           return res.status(400).send("update failed")
           const photos=await Photo.find().sort({_id:1}).lean()
           if(!photos)
               return res.status(400).send("no photos")
           res.json(photos)
      }
const deletePhoto=async(req,res)=>{
    const {id}=req.body
    if(!id)
    res.status(400).send("no id")
    const photo=await Photo.findById(id).exec()
    if(!photo)
    res.status(400).send("photo not found")
    await photo.deleteOne()
    const photos=await Photo.find().sort({_id:1}).lean()
    if(!photos)
        return res.status(400).send("no photos")
    res.json(photos)
}
module.exports={getAllPhotos,createPhoto,updatePhoto,deletePhoto}
