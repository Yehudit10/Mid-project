
import * as React from 'react';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, green,red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import{useState} from 'react'
import DeleteDialog from '../DeleteDialog';
import UserWindow from './UserWindow';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
const User=(props) =>{
  const UpdateUser=async(newUser)=>{
        try{
    const res=await axios.put('http://localhost:1750/users',newUser)
    if(res.status===200)
        props.setUsersList(res.data)
        }
        catch(err)
        {
            console.error(err)
        }
    }
   
const DeleteUser=async()=>{
    try{
    
    const res=await axios.delete("http://localhost:1750/users",{data:{id:props.User._id}})
    if(res.status===200)
        props.setUsersList(res.data)
}
    catch(err)
    {
        console.error(err)
    }
}
const [open,setOpen]=useState(false)
const [openDelete,setOpenDelete]=useState(false)

  return (
    <>
  <DeleteDialog openDelete={openDelete} setOpenDelete={setOpenDelete} Delete={DeleteUser}/>
  {/* <EditWindow2 open={open} setOpen={setOpen} newUser={newUser} setNewUser={setNewUser} setUsersList={props.setUsersList} action={UpdateUser}/> */}
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
