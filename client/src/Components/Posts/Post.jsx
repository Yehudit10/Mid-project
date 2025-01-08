import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import DeleteDialog from '../DeleteDialog';
import PostWindow from './PostWindow';




const Post=(props)=>{
  
      const UpdatePost=useCallback(async function Update_Post(newPost){
        try{
    const res=await axios.put(props.url,newPost)
    if(res.status===200)
        props.setPostsList(res.data)
        }
        catch(err)
        {
            console.error(err)
        }
    },[props.url])
    const DeletePost=useCallback(async()=>{
        try{
        const res=await axios.delete(props.url,{data:{id:props.Post._id}})
        if(res.status===200)
           props.setPostsList(res.data)
    }
        catch(err)
        {
            console.error(err)
        }
    },[props.Post._id,props.url])
const [open,setOpen]=useState(false)
const [openDelete,setOpenDelete]=useState(false)
    return (<>
  <DeleteDialog openDelete={openDelete} setOpenDelete={setOpenDelete} Delete={DeletePost}/>
  <PostWindow open={open} setOpen={setOpen} Post={props.Post} action={UpdatePost}/>
       <Card sx={{ width:0.3,margin:'1%',padding:'2%',boxShadow:6}}>
        <CardHeader subheaderTypographyProps={{align:"left"} }  
        avatar={
          <Avatar sx={{ bgcolor: grey[400]}} aria-label="user">
            {props.Post.title.charAt(0)}
          </Avatar>
        }
        subheader={props.Post.updatedAt}/>
        <CardContent sx={{width:1,height:'40vh'}}>
          <Typography gutterBottom variant="h6" component="div" >
            {props.Post.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' ,textAlign:"left", whiteSpace: 'pre-line' }}>
            {props.Post.body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton size="medium" sx={{color:"white",bgcolor:red[500],margin:1}}  onClick={()=>{ setOpenDelete(true)
        }}aria-label="delete">
          <DeleteIcon/>
        </IconButton>
        <IconButton size="medium" sx={{color:"white",bgcolor:blue[500],margin:1}} onClick={()=>{
                                  setOpen(true)}}aria-label="edit">
          <EditIcon/>
        </IconButton>
      </CardActions>
    </Card>
   
    </>)
}

export default Post