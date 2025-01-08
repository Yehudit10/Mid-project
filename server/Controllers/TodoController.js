const Todo=require("../modules/ToDo")
const getAllTodoes=async(req,res)=>{
const {completeState,update_date_start,update_date_end}=req.query 
//console.log(update_date_start)  
const query={updatedAt:{$lte:new Date(update_date_end||new Date()),$gte:new Date(update_date_start||0)}}     
if(completeState)  
query.completed=completeState
const todos=await Todo.find(query).sort({_id:1}).lean()
//console.log(todos)
if(!todos)
    return res.status(400).send("no todoes") 
res.json(todos)
}
//const todos=await Todo.find({...(completeState&&{completed:false}),updatedAt:{$lte:new Date(update_date_end)||new Date(),$gte:new Date(update_date_start||0)}}).sort({_id:1}).lean()
//const todos=await Todo.find({completed:{$in:completeState?[completeState]:[true,false]},updatedAt:{$lte:new Date(update_date_end)||new Date(),$gte:new Date(update_date_start||0)}}).sort({_id:1}).lean()

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
        // const todos=await Todo.find().sort({_id:1}).lean()
        // if(!todos)
        //     return res.status(400).send("no todoes")
        // res.json(todos)
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