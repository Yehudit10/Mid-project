const Todo=require("../modules/ToDo")
const getAllTodoes=async(req,res)=>{
const {sort,update_date_start,update_date_end}=req.query 
const query={updatedAt:{$lte:new Date(update_date_end||new Date()),$gte:new Date(update_date_start||0)}}     
const todos=await Todo.find(query).sort(sort||"_id").lean()
if(!todos)
    return res.status(400).send("no todoes") 
res.json(todos)
}

const getTodoByID=async(req,res)=>{
    const {id}=req.params
    const todo=await Todo.findById(id).lean()
    if(!todo)
        return res.status(400).send("no todoes")
    res.json(todo)
    }
    const createTodo=async(req,res)=>{
     const {title,tags,completed}=req.body
     if(!title)
     res.status.send("title is required")
     const todo=await Todo.create({title,tags,completed})
     if(!todo)
        return res.status(400).send("create failed")
        getAllTodoes(req,res)
    }
    const updateTodo=async(req,res)=>{
        const {_id,title,tags,completed}=req.body
        if(!_id||!title)
            return res.status(400).send("id and title are required")  
        const todo=await Todo.findById(_id).exec()
        if(!todo)
           return res.status(400).send("no todo")
        todo.title=title
        todo.tags=tags
        todo.completed=completed
        const savedTodo=await todo.save()
        if(!savedTodo)
            return res.status(400).send("update failed")
        getAllTodoes(req,res)
       }
       const deleteTodo=async(req,res)=>{
        const {id}=req.body
        console.log(id)
        if(!id)
            return res.status(400).send("id is required")
        const todo=await Todo.findById(id).exec()
        if(!todo)
           return res.status(400).send("no todo")
        await todo.deleteOne()
        getAllTodoes(req,res)
       }
module.exports={getAllTodoes,getTodoByID,createTodo,updateTodo,deleteTodo}