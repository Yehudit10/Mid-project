import { useEffect, useState } from "react";
import { Alert, Container, AppBar, Toolbar, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Box } from '@mui/joy';


const PhotoWindow = (props) => {
  const [isImgUrl, setIsImgUrl] = useState(true)
  const [newPhoto, setNewPhoto] = useState({ ...props.Photo })
  useEffect(() => { setNewPhoto({ ...props.Photo }) }, [props.Photo])
  const save = () => {
    if (!newPhoto.imgUrl) {
      setIsImgUrl(false)
      return
    }
    props.action(newPhoto, setNewPhoto)
    handleClose()
  }
  const handleClose = () => {
    props.setOpen(false);
    setIsImgUrl(true)

  }

  return (
    <Dialog open={props.open} >
      <DialogTitle id="alert-dialog-title">
        {props.action.name}
      </DialogTitle>
      <DialogContent  >
        <Container component="main" sx={{ pt: 3 }}>
          <AppBar position="fixed" component="nav">
            <Toolbar>
            </Toolbar>
          </AppBar>
          {!isImgUrl && <Alert variant="outlined" severity="error">
            ImgUrl is required!!
          </Alert>}
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <TextField sx={{ width: "50vw" }} required id="input-imgUrl" label="image url" variant="standard" defaultValue={newPhoto.imgUrl} onChange={(e) => {
                setNewPhoto({ ...newPhoto, imgUrl: e.target.value })
                setIsImgUrl(true)
              }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <TextField sx={{ width: "50vw" }} id="input-title" label="Title" variant="standard" defaultValue={newPhoto.title} onChange={(e) => {
                setNewPhoto({ ...newPhoto, title: e.target.value })
                setIsImgUrl(true)
              }} />
            </Box>
          </Box>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={() => {
          handleClose()
          setNewPhoto({ ...props.Photo })
        }} >
          Cancel
        </Button>
        <Button size="small" variant="contained" onClick={save} >
          Save
        </Button>
      </DialogActions>
    </Dialog>)
}
export default PhotoWindow