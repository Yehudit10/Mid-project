import { Fragment, useEffect, useRef, useState } from "react"
import axios from 'axios'
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
import InputLabel from '@mui/material/InputLabel';
import { Alert, Chip, IconButton, InputAdornment, ListItem } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const TodoWindow = (props) => {
    const [newTodo,setNewTodo]=useState({...props.Todo})
    useEffect(()=>{
        setNewTodo(props.Todo)
      },[props.Todo])
const save = async () => {
    if(!newTodo.title)
        {setIsTitle(false)
            return}
        props.action(newTodo,setNewTodo)
        handleClose()
     }
    const handleClose=()=>{
        props.setOpen(false); 
        setIsTitle(true)
    }
    const tagRef=useRef()
    const handleDelete = (tagToDelete) => () => {
        setNewTodo({...newTodo,tags:newTodo.tags.filter((tag) => tag != tagToDelete)});
      };
      const [isTitle,setIsTitle]=useState(true)
    return (<>

        <Dialog open={props.open} > 
            <DialogTitle id="alert-dialog-title">
                {props.action.name}
            </DialogTitle>
            <DialogContent sx={{padding:6}}>
                <Container component="main" sx={{ pt:0 }}>
                    <AppBar position="fixed" component="nav">
                        <Toolbar>
                        </Toolbar>
                    </AppBar>
                    {!isTitle?<Alert variant="outlined"  severity="error">
                Title is required!!
            </Alert>:null}
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    {newTodo?.tags?.map((tag)=>{
                        return(
                         <Chip
                         sx={{height:1/6}}
                         label={tag}
                         onDelete={handleDelete(tag)}
                         />)
                    })}
                   
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <InputLabel sx={{height:27}}>add tag:</InputLabel>
                            <TextField id="input-tag" variant="standard" inputRef={tagRef} sx={{width:1/3}}
                             slotProps={{
                                input: {
                                  endAdornment: <InputAdornment position="end"><IconButton
                                  onClick={()=>{
                                setNewTodo({...newTodo,tags:newTodo?.tags?[...newTodo.tags,tagRef.current.value]:[tagRef.current.value]})
                                tagRef.current.value=""
                    }}
                                  edge="end"
                                ><AddCircleOutlineIcon/>
                                </IconButton></InputAdornment>,
                                },
                              }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            
                            <TextField id="input-title" required variant="standard" defaultValue={newTodo?.title} fullWidth={true} onChange={(e) => {setNewTodo({...newTodo,title:e.target.value})
                        setIsTitle(true)} } />
                        </Box>
                    </Box>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={()=>{handleClose()
                setNewTodo({...props.Todo})}}>
                    Cancel
                </Button>
                <Button size="small" onClick={save} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    
    </>
    )
}
export default TodoWindow