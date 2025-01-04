import * as React from 'react';
import { Drawer, List, ListItemText, ListItemIcon, Box, IconButton, Typography, CssBaseline, ListItemButton } from '@mui/material';
import { Home } from '@mui/icons-material';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { TaskAlt as TaskAltIcon, Article as ArticleIcon, AccountCircle as AccountCircleIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, PhotoLibrary as PhotoLibraryIcon } from '@mui/icons-material';


const SideNav = () => {
  const NAVIGATION = [
    {
      path: '/home',
      title: 'Home',
      icon: <Home />,
    },
    {
      title: 'Users',
      icon: <AccountCircleIcon />,
      path: '/users',
    },
    {
      title: 'Posts',
      icon: <ArticleIcon />,
      path: '/posts',
    },
    {
      title: 'Todos',
      icon: <TaskAltIcon />,
      path: '/todos',
    },
    {
      title: 'Photos',
      icon: <PhotoLibraryIcon />,
      path: '/photos',
    }
  ];
  const location=useLocation()
  const [minimized, setMinimized] = React.useState(false);
  return (
    <>
    <Box sx={{ display: 'flex' }}>
      
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: minimized ? 60 : 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: minimized ? 60 : 240,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            color: '#333',
            padding: '16px 0',
            boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)',
            transition: 'width 0.3s ease-in-out',
          },
        }}

      >
        <Box sx={{ padding: 1, backgroundColor: 'inherit', display: 'flex', justifyContent: 'space-between' }}>
          {!minimized && (<Typography variant="h6" color="inherit" noWrap>
            Dashboard
          </Typography>)}

          <IconButton onClick={()=>{ setMinimized(!minimized)}} sx={{ color: 'black' }}>
            {minimized ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>
        <List>
        {NAVIGATION.map((item, index) => (
          <ListItemButton
            component={Link}
            to={item.path}
            selected={location.pathname===item.path}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            {!minimized && (<ListItemText primary={item.title} />)}
          </ListItemButton>
        ))}
      </List>
      </Drawer>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ padding: '16px', marginTop: '64px' }}>
          <Outlet />
        </Box>
      </Box>
    </Box></>
  );
};

export default SideNav;