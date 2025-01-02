import { Box, ImageListItem, ImageListItemBar } from "@mui/material";
import { IconButton, Typography } from "@mui/material"
import { useState } from "react"
import DeleteDialog from '../DeleteDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios"
import PhotoWindow from "./PhotoWindow";
import ShowPhoto from "./ShowPhoto";

const Photo=(props)=>{
  const [open,setOpen]=useState(false)
    const [openDelete,setOpenDelete]=useState(false)
    const [openPhoto,setOpenPhoto]=useState(false)

    const DeletePhoto=async()=>{
      try{
      const res=await axios.delete(`http://localhost:1750/photos`,{data:{id:props.Photo._id}})

      if(res.status===200)
          props.setPhotosList(res.data)
  }
      catch(err)
      {
          console.error(err)
      }
  }


  const UpdatePhoto=async(newPhoto)=>{
      try{
  const res=await axios.put('http://localhost:1750/photos',newPhoto)
  if(res.status===200)
      props.setPhotosList(res.data)
      }
      catch(err)
      {
          console.error(err)
      }
  }
    return(<>
    
    <ShowPhoto openPhoto={openPhoto} setOpenPhoto={setOpenPhoto} Photo={props.Photo}/>
    <DeleteDialog openDelete={openDelete} setOpenDelete={setOpenDelete} Delete={DeletePhoto}/>
<PhotoWindow open={open} setOpen={setOpen} Photo={props.Photo} action={UpdatePhoto}/>
        <ImageListItem  sx={{boxShadow:6,width:0.97,height:1}}  key={props.Photo.imgUrl}>
          <img
            style={{height:'100%',width:'100%'}}
            //srcSet={props.Photo.imgUrl}//{`${props.Photo.imgUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={props.Photo.imgUrl}//{`${props.Photo.imgUrl}?w=164&h=164&fit=crop&auto=format`}
            alt={props.Photo.title}
            loading="lazy"
          />
          <ImageListItemBar sx={{height:'20%'}}
            title={<Typography variant="h5">{props.Photo.title}</Typography>}
            //subtitle={item.author}
            actionIcon={<Box sx={{display:'flex'}}>
              <IconButton size="large" sx={{ color: 'rgba(255, 255, 255, 0.54)',margin:'1%' }}  onClick={()=>{ setOpen(true)}}aria-label="delete">
              <EditIcon fontSize="large"/>
            </IconButton>
            <IconButton size="large" sx={{ color: 'rgba(255, 255, 255, 0.54)',margin:'1%' }}  onClick={()=>{ setOpenDelete(true)}}aria-label="delete">
            <DeleteIcon fontSize="large"/>
            </IconButton>
            <IconButton size="large" sx={{ color: 'rgba(255, 255, 255, 0.54)',margin:'1%' }}  onClick={()=>{ setOpenPhoto(true)}}aria-label="delete">
            <ZoomInIcon fontSize="large"/>
            </IconButton></Box>
          
            }
          />
        </ImageListItem>
      
    
    </>)
}
export default Photo