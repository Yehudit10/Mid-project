import axios from 'axios'
import { useEffect, useState,useMemo } from 'react'
import User from './User'
import AddUser from './AddUser'
import { Box, Typography } from '@mui/material'
import Search from '../Search'
import DateFilter from '../DateFilter'

const Users=()=>{
    const[UsersList,setUsersList]=useState([])
    const [updateDates,setUpdateDates]=useState([])
    useEffect(() => { 
        getAllUsers() }, [updateDates])
    const getAllUsers=async()=>{
        try{
        const res=await axios.get(url)
        if(res.status===200)
                setUsersList(res.data)
    }
    catch(err)
    {
        console.error(err)
    }
    }

const [search,setSearch]=useState("")
const url=useMemo(()=> `http://localhost:1750/users?update_date_end=${updateDates[1]||""}&update_date_start=${updateDates[0]||""}`
    ,[updateDates])
    return(
        <>
        <Search setSearch={setSearch}/>
            <br />
            <br />
            <br />
            <Box sx={{display:'flex'}}>
        <Typography variant="h4" align="left" gutterBottom>
        Users
      </Typography>
      <Typography sx={{display:'flex',marginLeft:70}} variant="h4" align="right" gutterBottom>
                <DateFilter setDates={setUpdateDates}/>
            </Typography>
            </Box>
        <Box sx={{ display: "flex",
  flexWrap:"wrap"
  }}>
        {UsersList.filter((user)=>{return user.userName.includes(search)}).map((user)=>{return <User User={user} setUsersList={setUsersList} url={url}/>})}
      </Box>
        <AddUser setUsersList={setUsersList} url={url}/>
        </>
    )
   
}
export default Users