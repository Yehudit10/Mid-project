import axios from 'axios'
import { useEffect, useState } from 'react'
import AddTodo from './AddTodo'
import Todo from './Todo'
import { Typography } from '@mui/material'
import * as React from 'react';
import Search from '../Search'



const Todos = () => {
    const [todosList, setTodosList] = useState([])
    useEffect(() => { getAllTodos() }, [])
    const getAllTodos = async () => {
        try {
            console.log("useefect")
            const res = await axios.get('http://localhost:1750/todos')
            if (res.status === 200)
                setTodosList(res.data)

        }
        catch (err) {
            console.error(err)
        }
    }



    const [search, setSearch] = useState("")
    return (
        <>
            <Search setSearch={setSearch}/>
            <br />
            <br />
            <br />
            <Typography variant="h4" align="left" gutterBottom>
                Todos
            </Typography>
            <AddTodo setTodosList={setTodosList} />
            {/* <Box  sx={{ display: "flex","flex-wrap":"wrap" }}> */}
            {todosList.filter((todo) => { return todo.title?.includes(search) }).sort((t1,t2)=>(t1._id).localeCompare(t2._id)).map((todo) => { return <Todo Todo={todo} setTodosList={setTodosList} /> })}
            {/* </Box> */}

        </>
    )
}
export default Todos