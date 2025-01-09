const Post=require("../modules/Post")
const getAllPosts=async(req,res)=>{
    const {sort,update_date_start,update_date_end}=req.query 
    const query={updatedAt:{$lte:new Date(update_date_end||new Date()),$gte:new Date(update_date_start||0)}}   
    const posts=await Post.find(query).sort(sort||"_id").lean()
if(!posts)
    return res.status(400).send("no posts")
res.json(posts)
}
const getPostByID=async(req,res)=>{
    const {id}=req.params
    const post=await Post.findById(id).lean()
    if(!post)
        return res.status(400).send("no user")
    res.json(post)
    }
    const createPost=async(req,res)=>{
     const {title,body}=req.body
     if(!title)
        return res.status(400).send("title is required")
     const post=await Post.create({title,body})
     if(!post)
        return res.status(400).send("create failed")
        getAllPosts(req,res)

    }
    const updatePost=async(req,res)=>{
        const {_id,title,body}=req.body
        if(!_id||!title)
            return res.status(400).send("id and title is required")
        const post=await Post.findById(_id).exec()
        if(!post)
           return res.status(400).send("no post")
        post.title=title
        post.body=body
        const savedPost=await post.save()
        if(!savedPost)
            return res.status(400).send("update failed")
            getAllPosts(req,res)

       }
       const deletePost=async(req,res)=>{
        const {id}=req.body
        if(!id)
            return res.status(400).send("id is required")
        const post=await Post.findById(id).exec()
        if(!post)
           return res.status(400).send("no post")
        await post.deleteOne()
        getAllPosts(req,res)


       
       }
module.exports={getAllPosts,getPostByID,createPost,updatePost,deletePost}