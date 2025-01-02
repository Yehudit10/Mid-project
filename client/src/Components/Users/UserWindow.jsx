import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import { Alert } from "@mui/material";


const UserWindow=(props)=>{
    const [isUserName,setIsUserName]=useState(true)
    const[newUser,setNewUser]=useState({...props.User})
    useEffect(()=>{
        console.log("useefect")
        setNewUser({...props.User})
      },[props.User])
    const save = async () => {
        if (!newUser.userName) {
            setIsUserName(false)
       return
        }
        props.action(newUser,setNewUser)
        handleClose()
    
     }
    const handleClose=()=>{
        props.setOpen(false); 
        setIsUserName(true)
    }
    return( <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    > 
     
        <DialogTitle id="alert-dialog-title">
            {props.action.name}
        </DialogTitle>
        <DialogContent>
            <Container component="main" sx={{ pt:3 }}>
                <AppBar position="fixed" component="nav">
                    <Toolbar>
                    </Toolbar>
                </AppBar>
                {!isUserName?<Alert variant="outlined"  severity="error">
            UserName is required!!
        </Alert>:null}
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-name" label="Name" variant="standard" defaultValue={newUser.name} onChange={(e) => setNewUser({...newUser,name:e.target.value}) } />
                    </Box>
                    {/* <br /> */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField required id="input-userName" label="UserName" variant="standard"  defaultValue={newUser.userName} onChange={(e) => {setNewUser({...newUser,userName:e.target.value})
                         setIsUserName(true)}} />
                    </Box>
                    {/* <br /> */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountBalanceIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-address" label="address" variant="standard" defaultValue={newUser.address} onChange={(e) => setNewUser({...newUser,address:e.target.value})} />
                    </Box>
                    {/* <br /> */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-phone" label="Phone" variant="standard" defaultValue={newUser.phone} onChange={(e) =>setNewUser({...newUser,phone:e.target.value})} />
                    </Box>
                    {/* <br /> */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-email" label="Email" variant="standard" defaultValue={newUser.email} onChange={(e) => setNewUser({...newUser,email:e.target.value})} />
                    </Box>
                </Box>
            </Container>
        </DialogContent>
        <DialogActions>
            <Button size="small" onClick={()=>{handleClose()
            setNewUser({...props.User})}}>
                Cancel
            </Button>
            <Button size="small" onClick={save} variant="contained">
                Save
            </Button>
        </DialogActions>
    </Dialog>)
}
export default UserWindow