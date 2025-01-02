import * as React from 'react';
import { Suspense } from "react"
import {  Route, Routes } from "react-router-dom"
import SideNav from "./Navbar"
import { Box } from '@mui/material';
const Posts=React.lazy(()=>import('./Posts/Posts'))
const Users=React.lazy(()=>import('./Users/Users'))
const Todos=React.lazy(()=>import('./Todos/Todos'))
const Photos=React.lazy(()=>import('./Photos/Photos'))
const HomePage=()=>{


return(
   
    <Box sx={{ display: 'flex', height: '100vh' }}>
    <SideNav />
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Routes>
        <Route path='/posts' element={<Suspense fallback="loading...."><Posts /></Suspense>} />
        <Route path='/users' element={<Suspense fallback="loading..."><Users /></Suspense>} />
        <Route path='/todos' element={<Suspense fallback="loading..."><Todos /></Suspense>} />
        <Route path='/photos' element={<Suspense fallback="loading..."><Photos /></Suspense>} />
      </Routes>
    </Box>
  </Box>
)
}
export default HomePage




  
 

