
import { useState,useCallback } from "react"
import { IconButton } from '@mui/material';
import axios from "axios";
import PhotoWindow from './PhotoWindow';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const AddPhoto = (props) => {
  const [open, setOpen] = useState(false)
  const CreatePhoto =useCallback(async function Create_Photo(newPhoto,setNewPhoto){
    try {
      const res = await axios.post(props.url, newPhoto)
      if (res.status === 200)
          {
            props.setPhotosList(res.data)
            setNewPhoto({})
          }
    }
    catch (err) {
      console.error(err)
    }
  },[])
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
          setOpen(true)
        }}
      >
        <AddPhotoAlternateIcon fontSize="large" />
      </IconButton></>)
}
export default AddPhoto