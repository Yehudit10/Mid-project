import axios from 'axios'
import { useEffect, useState } from 'react'
import User from './User'
import AddUser from './AddUser'
import { Box, Typography } from '@mui/material'
import Search from '../Search'
const Users=()=>{
    const[UsersList,setUsersList]=useState([])
    useEffect(()=>{getAllUsers()},[])
    const getAllUsers=async()=>{
        try{
        const res=await axios.get('http://localhost:1750/users')
        if(res.status===200)
                setUsersList(res.data)
    }
    catch(err)
    {
        console.error(err)
    }
    }

const [search,setSearch]=useState("")

    return(
        <>
        <Search setSearch={setSearch}/>
            <br />
            <br />
            <br />
        <Typography variant="h4" align="left" gutterBottom>
        Users
      </Typography>
        <Box sx={{ display: "flex",
  flexWrap:"wrap"
  }}>
        {UsersList.filter((user)=>{return user.userName.includes(search)}).sort((u1,u2)=>(u1._id).localeCompare(u2._id)).map((user)=>{return <User User={user} setUsersList={setUsersList}/>})}
      </Box>
        <AddUser setUsersList={setUsersList}/>
        </>
    )
   
}
export default Users