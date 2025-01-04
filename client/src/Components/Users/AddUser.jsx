import { useState,useCallback } from "react"
import { IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from "axios";
import UserWindow from "./UserWindow";

const AddUser=(props)=>{
    const CreateUser=useCallback( async(newUser,setNewUser)=>{
    try{
       const res=await axios.post('http://localhost:1750/users',newUser)
       if(res.status===200)
        props.setUsersList(res.data)
    setNewUser({})
    }
    catch(err)
    {
        console.error(err)
    }
},[])
   
    const [open,setOpen]=useState(false)
    
    return (
        <>
<UserWindow open={open} setOpen={setOpen} action={CreateUser}/>
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
    <PersonAddIcon fontSize="large"/>
  </IconButton></>)
}
export default AddUser