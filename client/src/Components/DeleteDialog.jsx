import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

const DeleteDialog=(props)=>{
return(
    <Dialog open={props.openDelete} >
        <DialogContent>
          <DialogContentText fontSize={20} sx={{padding:3}} >
           Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={()=>{props.setOpenDelete(false)}} autoFocus>
            Cancel
          </Button>
          <Button variant="contained" onClick={()=>{props.Delete()
        props.setOpenDelete(false)}}>Delete</Button>
        </DialogActions>
      </Dialog>
)
}
export default DeleteDialog