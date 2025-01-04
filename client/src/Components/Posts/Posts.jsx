import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Post from './Post';
import AddPost from './AddPost';
import Search from '../Search';

const Posts=()=>{
    const getAllPosts=async()=>{
        try{
        const res=await axios.get(`http://localhost:1750/posts`)
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
    useEffect(()=>{getAllPosts()},[])
    return(
        <>
           <Search setSearch={setSearch}/>
            <br />
            <br />
            <br />
        <Typography variant="h4" align="left" gutterBottom>
       Posts
      </Typography>
         <Box sx={{ display: "flex",
  flexWrap:"wrap"
  }}>
        {PostsList.filter((post)=>{return post.title?.includes(search)}).map((post)=>{return <Post Post={post} setPostsList={setPostsList}/>})}
        </Box>
        <AddPost setPostsList={setPostsList}/>
        </>
    )
   
}
export default Posts