import axios from 'axios'
import { useEffect, useState,useMemo } from 'react'
import User from './User'
import AddUser from './AddUser'
import { Box, Typography } from '@mui/material'
import Search from '../Search'
import DateFilter from '../DateFilter'
import Sort from '../Sort'


const Users=()=>{
    const[UsersList,setUsersList]=useState([])
    const [updateDates,setUpdateDates]=useState([])
    const [sort,setSort]=useState("")
    const [search,setSearch]=useState("")

    const SortBy=[{name:"user name",value:"userName"},{name:"phone",value:"phone"},{name:"last update date",value:"updatedAt"},{name:"craete date",value:"createdAt"}]
    const url=useMemo(()=> `http://localhost:1750/users?sort=${SortBy.find(s=>s.name===sort)?.value||""}&update_date_end=${updateDates[1]||""}&update_date_start=${updateDates[0]||""}`
    ,[updateDates,sort])
    useEffect(() => {   getAllUsers() }, [updateDates,sort])
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


    return(
        <>
        <Search setSearch={setSearch}/>
            <Box sx={{display:'flex',marginTop:10}}>
        <Typography variant="h4" align="left" gutterBottom>
        Users
      </Typography>
      <Typography sx={{display:'flex',marginLeft:60}} variant="h4" align="right" gutterBottom>
      <Sort setSort={setSort} SortBy={SortBy} sort={sort}/>
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