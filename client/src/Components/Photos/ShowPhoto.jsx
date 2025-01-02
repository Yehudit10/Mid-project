import CloseIcon from '@mui/icons-material/Close';
import { Dialog, IconButton, ImageListItem } from '@mui/material';
const ShowPhoto=(props)=>{
   return(
    <Dialog open={props.openPhoto}>
        <ImageListItem sx={{display:'flex'}}>
        <IconButton sx={{
        position:'absolute',
        color:'white',
        bgcolor: 'rgba(150, 150, 150, 0.54)',
        top: '5%',
        left:'5%', 
      }}onClick={()=>{props.setOpenPhoto(false)}}>
        <CloseIcon/>
      </IconButton>
    <img
style={{
  maxWidth: '100%', // Makes sure the image does not overflow the dialog
  maxHeight: '100%', // Ensures the image fits within the dialog size
  objectFit: 'contain', // Ensures the image aspect ratio is preserved
}}
            src={props.Photo.imgUrl}
            alt={props.Photo.title}
            loading="lazy"
          />
          </ImageListItem>
          </Dialog>)
}
export default ShowPhoto