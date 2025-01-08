
const Photo=require("../modules/Photo")

const getAllPhotos=async(req,res)=>{

  const {update_date_start,update_date_end}=req.query 
const query={updatedAt:{$lte:new Date(update_date_end||new Date()),$gte:new Date(update_date_start||0)}}     
const photos=await Photo.find(query).sort({_id:1}).lean()
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
     getAllPhotos(req,res)
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
           getAllPhotos(req,res)

      }
const deletePhoto=async(req,res)=>{
    const {id}=req.body
    if(!id)
    return res.status(400).send("no id")
    const photo=await Photo.findById(id).exec()
    if(!photo)
    return res.status(400).send("photo not found")
    await photo.deleteOne()
    getAllPhotos(req,res)
}
module.exports={getAllPhotos,createPhoto,updatePhoto,deletePhoto}
