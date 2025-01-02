import * as React from 'react';
import { useState } from "react"
import { IconButton } from '@mui/material';
import axios from "axios";
import PhotoWindow from './PhotoWindow';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
const AddPhoto = (props) => {
  const CreatePhoto = async (newPhoto,setNewPhoto) => {
    try {
      const res = await axios.post('http://localhost:1750/photos', newPhoto)
      if (res.status === 200)
          {
            props.setPhotosList(res.data)
            setNewPhoto({})
          }
    }
    catch (err) {
      console.error(err)
    }
  }
  const handleClose = () => {
    setOpen(false);
  }
  const [open, setOpen] = useState(false)
  
  return (
    <>
    <PhotoWindow open={open} setOpen={setOpen} Photo={{}} action={CreatePhoto}/>
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
        onClick={() => {
          //setNewPhoto({})
          setOpen(true)
        }}
      >
        <AddPhotoAlternateIcon fontSize="large" />
      </IconButton></>)
}
export default AddPhoto