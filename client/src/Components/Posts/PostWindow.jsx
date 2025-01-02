import { useEffect, useState } from "react"
import { Alert, Container } from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/joy/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const PostWindow=(props)=>{
    const [isTitle,setIsTitle]=useState(true)
    const[newPost,setNewPost]=useState({...props.Post})
    useEffect(()=>{
      setNewPost(props.Post)
    },[props.Post])
    const save=()=>{
        if(!newPost.title)
        {setIsTitle(false)
            return}
      props.action(newPost,setNewPost)
      handleClose()
    }
    const handleClose=()=>{
        props.setOpen(false); 
        setIsTitle(true)
       
    }
    return(
  <Dialog open={props.open} >
        <DialogTitle id="alert-dialog-title">
          {props.action.name}
        </DialogTitle>
        <DialogContent >
          <Container component="main" sx={{ pt: 3 }}>
            <AppBar position="fixed" component="nav">
              <Toolbar>
              </Toolbar>
            </AppBar>
            {!isTitle?<Alert variant="outlined"  severity="error">
                Title is required!!
            </Alert>:null}
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField required id="input-title" label="Title" variant="standard" defaultValue={newPost.title} onChange={(e) => {setNewPost({ ...newPost, title: e.target.value })
                setIsTitle(true)}} />
              </Box>
                <Textarea label="Body" placeholder="Type your body here…" defaultValue={newPost.body}  sx={{height:250,width:400}} minRows={5}
                  onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}/> 
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={()=>{handleClose()
           setNewPost({...props.Post})}} >
            Cancel
          </Button>
          <Button size="small" variant="contained" onClick={save} >
            Save
          </Button>
        </DialogActions>
      </Dialog>)
}
export default PostWindow