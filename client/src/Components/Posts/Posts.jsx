import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Post from './Post';
import AddPost from './AddPost';
import Search from '../Search';
import DateFilter from '../DateFilter';

const Posts=()=>{
    const [updateDates,setUpdateDates]=useState([])
    useEffect(() => { 
        getAllPosts() }, [updateDates])
    const getAllPosts=async()=>{
        try{
        const res=await axios.get(url)
        if(res.status===200)
                setPostsList(res.data)
            
    }
    catch(err)
    {
        console.error(err)
    }
    }
    const[PostsList,setPostsList]=useState([])
    const [search,setSearch]=useState("")
    //useEffect(()=>{getAllPosts()},[])
    const url=useMemo(()=> `http://localhost:1750/posts?update_date_end=${updateDates[1]||""}&update_date_start=${updateDates[0]||""}`
     ,[updateDates])
    return(
        <>
           <Search setSearch={setSearch}/>
            <br />
            <br />
            <br />
    <Box sx={{display:'flex'}}>
        <Typography variant="h4" align="left" gutterBottom>
       Posts
      </Typography>
      <Typography sx={{display:'flex',marginLeft:70}} variant="h4" align="right" gutterBottom>
                <DateFilter setDates={setUpdateDates}/>
            </Typography>
            </Box>

         <Box sx={{ display: "flex",
  flexWrap:"wrap"
  }}>
        {PostsList.filter((post)=>{return post.title?.includes(search)}).map((post)=>{return <Post Post={post} setPostsList={setPostsList} url={url}/>})}
        </Box>
        <AddPost setPostsList={setPostsList} url={url}/>
        </>
    )
   
}
export default Posts