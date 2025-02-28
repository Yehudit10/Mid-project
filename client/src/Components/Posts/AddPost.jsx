
import { useState,useCallback } from "react"
import { IconButton } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import axios from "axios";
import PostWindow from './PostWindow';

const AddPost = (props) => {
  const [open, setOpen] = useState(false)
  const CreatePost = useCallback(async function Create_Post (newPost,setNewPost){
    try {
      const res = await axios.post(props.url, newPost)
      if (res.status === 200)
          {
            props.setPostsList(res.data)
            setNewPost({})
          }
    }
    catch (err) {
      console.error(err)
    }
  },[])
  return (
    <>
    <PostWindow open={open} setOpen={setOpen} Post={{}} action={CreatePost}/>
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
        <PostAddIcon fontSize="large" />
      </IconButton></>)
}
export default AddPost