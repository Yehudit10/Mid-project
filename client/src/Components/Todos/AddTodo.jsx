import { IconButton } from "@mui/material"
import TodoWindow from "./TodoWindow"
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useState } from "react";
import axios from "axios";

const AddTodo=(props)=>{
const [open,setOpen]=useState(false)
const CreateTodo=async(newToDo,setNewTodo)=>{
  try{
     const res=await axios.post('http://localhost:1750/todos',newToDo)
     if(res.status===200)
      props.setTodosList(res.data)
      setNewTodo({})
  }
  catch(err)
  {
      console.error(err)
  }
}
    return(<>
    <TodoWindow  open={open} setOpen={setOpen} action={CreateTodo}/>
    <IconButton 
    sx={{
      position: 'fixed', 
      bottom: 16,       
      left: 16,         
      backgroundColor: 'primary.main', 
      color: 'white',   
      padding: 2,       
      borderRadius: '50%', 
      boxShadow: 3,      
      zIndex: 9999,      
      '&:hover': {       
        backgroundColor: 'primary.dark',
      },
    }}
    onClick={() =>{
      setOpen(true)}} 
  >
    <AddTaskIcon fontSize="large"/>
  </IconButton></>)
}
export default AddTodo