import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import AddTodo from './AddTodo'
import Todo from './Todo'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import Search from '../Search'
import DateFilter from '../DateFilter'
import Sort from '../Sort'


const Todos = () => {
    const [todosList, setTodosList] = useState([])
    const [updateDates,setUpdateDates]=useState([])
    const [sort,setSort]=useState("")
    const SortBy=[{name:"title",value:"title"},{name:"completed",value:"completed"},{name:"last update date",value:"updatedAt"},{name:"craete date",value:"createdAt"}]
    useEffect(() => { getAllTodos() }, [updateDates,sort])
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
    
    const [search, setSearch] = useState("")
    const url=useMemo(()=>`http://localhost:1750/todos?sort=${SortBy.find(s=>s.name===sort)?.value||""}&update_date_end=${updateDates[1]||""}&update_date_start=${updateDates[0]||""}`
     ,[updateDates,sort])

    return (
        <>
    <Search setSearch={setSearch}/>
    <Box sx={{display:'flex',marginTop:10}}>
            <Typography sx={{display:'flex',marginTop:3}} variant="h4" align="left" gutterBottom>
                Todos
            </Typography>
            <Typography sx={{display:'flex',marginLeft:60}} variant="h4" align="right" gutterBottom>
              <Sort setSort={setSort} SortBy={SortBy} sort={sort}/>
              <DateFilter setDates={setUpdateDates}/>
            </Typography>
            </Box>
            <AddTodo setTodosList={setTodosList}url={url}/>
            {todosList.filter((todo) => todo.title?.includes(search)).map((todo) => { return <Todo Todo={todo} setTodosList={setTodosList} url={url}/> })}
        </>
    )
}
export default Todos