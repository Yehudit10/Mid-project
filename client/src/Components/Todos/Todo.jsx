import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Chip, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import DeleteDialog from '../DeleteDialog';
import { blue, red} from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/joy/Checkbox';
import Done from '@mui/icons-material/Done';
import axios from "axios";
import TodoWindow from "./TodoWindow";

const Todo=(props)=>{
    const [open,setOpen]=useState(false)
    const [openDelete,setOpenDelete]=useState(false)
    const [completed,setCompleted]=useState(props.Todo.completed)
    const UpdateComplete=async(todo)=>{
        try{
            console.log(!todo.completed)
      const res=await axios.put(`http://localhost:1750/todos`,{...todo,completed:!todo.completed})
      if(res.status===200)
        props.setTodosList(res.data)
        }
        catch(err)
        {
            console.error(err)
        }
      
    }
    const DeleteToDo=async()=>{
        try{
        const res=await axios.delete(`http://localhost:1750/todos`,{data:{id:props.Todo._id}})

        if(res.status===200)
            props.setTodosList(res.data)
    }
        catch(err)
        {
            console.error(err)
        }
    }


    const UpdateToDo=async(newTodo,setNewTodo)=>{
        try{
    const res=await axios.put('http://localhost:1750/todos',newTodo)
    if(res.status===200)
        props.setTodosList(res.data)
        }
        catch(err)
        {
            console.error(err)
        }
    }
    return(
        <>
       <DeleteDialog openDelete={openDelete} setOpenDelete={setOpenDelete} Delete={DeleteToDo}/>
       <TodoWindow open={open} setOpen={setOpen} Todo={props.Todo} action={UpdateToDo}/>
        <Card sx={{ width:0.98 ,margin:'2%',padding:'1%',boxShadow:6}} >
      <CardHeader 
      subheaderTypographyProps={{align:"left"} }
        avatar={
          <Avatar sx={{bgcolor: "#ffab91",marginTop:5 }}>
            {props.Todo.title?.charAt(0)}
          </Avatar>
          
        }
        title=
        {<Box sx={{ display: 'flex',justifyContent:'center'}}>
        {props.Todo.tags?.map((tag, index) => (
          <Chip key={index} label={tag} sx={{ margin: 0.5 }} />
        ))}
      </Box>}

        subheader={props.Todo.updatedAt} 
      />
      <CardContent>
        <Typography align="left" variant="h5" sx={{ color: 'text.secondary',marginLeft:4 }}>
       {props.Todo.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton size="medium" sx={{color:"white",bgcolor:red[500],margin:1}} onClick={()=>{ setOpenDelete(true)}}aria-label="delete">
          <DeleteIcon/>
        </IconButton>
        <IconButton  size="medium" sx={{color:"white",bgcolor:blue[500],margin:1}}   onClick={()=>{
                                  setOpen(true)}}aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton  aria-label="complete">
<Done fontSize="sm" sx={{ height:20,width:20,ml: -0.5, zIndex: 2, pointerEvents: 'none',color:completed?"white":"green"}}   />
<Checkbox  size="sm"  label={"completed"} disableIcon overlay
          onChange={() => {
            setCompleted(!completed)
           UpdateComplete(props.Todo)
          }}
          checked={completed}
          color="success"
          slotProps={{
            action: () => ({
                variant:'soft',
                color:'success',
              sx: 
                {
                   display:'flex',
                    border:'1px solid' ,
                    borderColor:'success.500',
                    borderRadius:70,  
                  }
               
            }),
          }}

          />
          
        </IconButton>
      </CardActions>
    </Card></>
    )

}
export default Todo