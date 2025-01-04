const express=require("express")
const TodoController=require("../Controllers/TodoController")
const router=express.Router()

router.get("/",TodoController.getAllTodoes)
router.get("/:id",TodoController.getTodoByID)
router.post("/",TodoController.createTodo)
router.put("/",TodoController.updateTodo)
router.delete("/",TodoController.deleteTodo)
module.exports=router