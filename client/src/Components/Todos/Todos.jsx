import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import AddTodo from './AddTodo'
import Todo from './Todo'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import Search from '../Search'
import DateFilter from '../DateFilter'


const Todos = () => {
    const [todosList, setTodosList] = useState([])
    const [updateDates,setUpdateDates]=useState([])
    useEffect(() => { 
        getAllTodos() }, [updateDates])
    const getAllTodos = async () => {
        try {
            const res = await axios.get(url)
            if (res.status === 200)
                setTodosList(res.data)

        }
        catch (err) {
            console.error(err)
        }
    }
    
    const[completeState,setCompleteState]=useState()

    const [search, setSearch] = useState("")
    const url=useMemo(()=>`http://localhost:1750/todos?completeState=${completeState||""}&update_date_end=${updateDates[1]||""}&update_date_start=${updateDates[0]||""}`
     ,[completeState,updateDates])

    return (
        <>
    <Search setSearch={setSearch}/>
    <br/>
    <br/>
    <br/>
    <Box sx={{display:'flex'}}>
            <Typography sx={{display:'flex',marginTop:3}} variant="h4" align="left" gutterBottom>
                Todos
            </Typography>
            <Typography sx={{display:'flex',marginLeft:70}} variant="h4" align="right" gutterBottom>
                <DateFilter setDates={setUpdateDates}/>
            </Typography>
            </Box>
            <AddTodo setTodosList={setTodosList}url={url}/>
            {todosList.filter((todo) => todo.title?.includes(search)).map((todo) => { return <Todo Todo={todo} setTodosList={setTodosList} url={url}/> })}
        </>
    )
}
export default Todos