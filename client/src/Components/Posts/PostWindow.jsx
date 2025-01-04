import { useEffect, useState } from "react";
import { Alert, Container, AppBar, Toolbar, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Box } from "@mui/joy";
import Textarea from '@mui/joy/Textarea';


const PostWindow=(props)=>{
  useEffect(()=>{
    setNewPost(props.Post)
  },[props.Post])
  
    const [isTitle,setIsTitle]=useState(true)
    const[newPost,setNewPost]=useState({...props.Post})
   
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
  useEffect(()=>{console.log("createpost")},[props.action])

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