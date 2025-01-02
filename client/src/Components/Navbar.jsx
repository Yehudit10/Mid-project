import * as React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Box, IconButton, Typography, CssBaseline, ListItemButton } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import { Home, } from '@mui/icons-material'
import { Suspense } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; 
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; 
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
const SideNav = () => {
  const NAVIGATION = [
    {
      segment: '/',
      title: 'Home',
      icon: <Home />,
    },
    {
      title: 'Users',
      icon: <AccountCircleIcon />,
      segment: '/users',
    },
    {
      title: 'Posts',
      icon: <ArticleIcon />,
      segment: '/posts',
    },
    {
      title: 'Todos',
      icon: <TaskAltIcon />,
      segment: '/todos',
    },
    {
      title: 'Photos',
      icon: <PhotoLibraryIcon />,
      segment: '/photos',
    }
  ];
  const [minimized, setMinimized] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
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
            to={item.segment}
            selected={selectedIndex === index}
            onClick={() => { setSelectedIndex(index) }}
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
    </Box>
  );
};

export default SideNav;