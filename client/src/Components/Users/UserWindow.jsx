import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, AppBar, Toolbar, Container, TextField, Alert } from '@mui/material';
import { AccountCircle, AccountBalance as AccountBalanceIcon, Email as EmailIcon, Phone as PhoneIcon, Person as PersonIcon } from '@mui/icons-material';



const UserWindow = (props) => {
    useEffect(() => {
        setNewUser({ ...props.User })
    }, [props.User])
    const [isUserName, setIsUserName] = useState(true)
    const [newUser, setNewUser] = useState({ ...props.User })

    const save = async () => {
        if (!newUser.userName) {
            setIsUserName(false)
            return
        }
        props.action(newUser, setNewUser)
        handleClose()

    }
    const handleClose = () => {
        props.setOpen(false);
        setIsUserName(true)
    }
    return (<Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >

        <DialogTitle id="alert-dialog-title">
            {props.action.name}
        </DialogTitle>
        <DialogContent>
            <Container component="main" sx={{ pt: 3 }}>
                <AppBar position="fixed" component="nav">
                    <Toolbar>
                    </Toolbar>
                </AppBar>
                {!isUserName && <Alert variant="outlined" severity="error">
                    UserName is required!!
                </Alert>}
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-name" label="Name" variant="standard" defaultValue={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField required id="input-userName" label="UserName" variant="standard" defaultValue={newUser.userName} onChange={(e) => {
                            setNewUser({ ...newUser, userName: e.target.value })
                            setIsUserName(true)
                        }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountBalanceIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-address" label="address" variant="standard" defaultValue={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-phone" label="Phone" variant="standard" defaultValue={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-email" label="Email" variant="standard" defaultValue={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                    </Box>
                </Box>
            </Container>
        </DialogContent>
        <DialogActions>
            <Button size="small" onClick={() => {
                handleClose()
                setNewUser({ ...props.User })
            }}>
                Cancel
            </Button>
            <Button size="small" onClick={save} variant="contained">
                Save
            </Button>
        </DialogActions>
    </Dialog>)
}
export default UserWindow