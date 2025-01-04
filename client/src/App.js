import './App.css';
import SideNav from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import { Box } from '@mui/material';

const Posts=React.lazy(()=>import('./Components/Posts/Posts'))
const Users=React.lazy(()=>import('./Components/Users/Users'))
const Todos=React.lazy(()=>import('./Components/Todos/Todos'))
const Photos=React.lazy(()=>import('./Components/Photos/Photos'))
const HomePage=React.lazy(()=>import('./Components/HomePage'))

function App() {

  return (
    <div className="App">
   <Box sx={{ display: 'flex', height: '100vh' }}>
    <SideNav />
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Routes>
      <Route index element={<Suspense fallback="loading...."><HomePage/></Suspense>} />
       <Route path='/home' element={<Suspense fallback="loading...."><HomePage/></Suspense>} />
        <Route path='/posts' element={<Suspense fallback="loading...."><Posts /></Suspense>} />
        <Route path='/users' element={<Suspense fallback="loading..."><Users /></Suspense>} />
        <Route path='/todos' element={<Suspense fallback="loading..."><Todos /></Suspense>} />
        <Route path='/photos' element={<Suspense fallback="loading..."><Photos /></Suspense>} />
      </Routes>
      </Box>
      </Box>
    </div>
  );
}

export default App;
