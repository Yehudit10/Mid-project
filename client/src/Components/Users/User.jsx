
import axios from 'axios';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography } from '@mui/material';
import { blue, green, red } from '@mui/material/colors';
import { Delete as DeleteIcon, Edit as EditIcon, AccountBalance as AccountBalanceIcon, MailOutline as MailOutlineIcon, LocalPhone as LocalPhoneIcon } from '@mui/icons-material';
import { useState, useCallback } from 'react';
import DeleteDialog from '../DeleteDialog';
import UserWindow from './UserWindow';

const User=(props) =>{
  const [open,setOpen]=useState(false)
const [openDelete,setOpenDelete]=useState(false)
  const UpdateUser=useCallback(async function Update_User(newUser){
        try{
    const res=await axios.put(props.url,newUser)
    if(res.status===200)
        props.setUsersList(res.data)
        }
        catch(err)
        {
            console.error(err)
        }
    },[props.url])
   
const DeleteUser=useCallback(async()=>{
    try{
    
    const res=await axios.delete(props.url,{data:{id:props.User._id}})
    if(res.status===200)
        props.setUsersList(res.data)
}
    catch(err)
    {
        console.error(err)
    }
},[props.User._id,props.url])


  return (
    <>
  <DeleteDialog openDelete={openDelete} setOpenDelete={setOpenDelete} Delete={DeleteUser}/>
  <UserWindow open={open} setOpen={setOpen}User={props.User} action={UpdateUser}/>
    <Card sx={{ width:0.48 ,margin:'1%',boxShadow:6,padding:'1%'}} >
      <CardHeader subheaderTypographyProps={{align:"left"} }
        avatar={
          <Avatar sx={{ bgcolor: green[300] }} aria-label="user">
            {props.User.userName.charAt(0)}
          </Avatar>
        }
        subheader={props.User.updatedAt}
      />
      <CardContent sx={{ width:1,height:'40%',marginBottom:'1%' }}>
      <Typography variant="h5"   sx={{display:'flex', color: 'text.secondary',justifyContent: 'center' }}>
          {props.User.userName}
        </Typography>
        <Typography variant="body2"  sx={{display:'flex', color: 'text.secondary',marginLeft:'30%' ,marginTop:'2%' }}>
          <MailOutlineIcon fontSize="small"/>
          {props.User.email}
        </Typography>
        <Typography variant="body2" sx={{display:'flex', color: 'text.secondary', marginLeft:'30%',marginTop:'2%' }} >
          <LocalPhoneIcon  fontSize="small"/>
          {props.User.phone}
        </Typography>
        <Typography variant="body2"   sx={{display:'flex', color: 'text.secondary',marginLeft:'30%',marginTop:'2%'}}>
          <AccountBalanceIcon fontSize="small"/>
          {props.User.address}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton size="medium" sx={{color:"white",bgcolor:red[500],margin:'2%'}} onClick={()=>{ setOpenDelete(true)}}aria-label="delete">
          <DeleteIcon/>
        </IconButton>
        <IconButton size="medium" sx={{color:"white",bgcolor:blue[500],margin:'2%'}} onClick={()=>{
                                  setOpen(true)}}aria-label="edit">
          <EditIcon />
        </IconButton>
   
      </CardActions>
      
    </Card></>
  );
}
export default User
