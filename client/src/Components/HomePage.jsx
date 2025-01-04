
import { Typography, Button, Grid, Paper, styled } from '@mui/material';
import { AccountCircle as AccountCircleIcon, ArrowForward as ArrowForwardIcon, TaskAlt as TaskAltIcon, Article as ArticleIcon, PhotoLibrary as PhotoLibraryIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const HomePage=()=>{
  const NAVIGATION = [
        
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


  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    borderRadius: '16px',
    boxShadow: theme.shadows[5],
    color: theme.palette.primary.main,
    bgcolor:theme.palette.white,
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }));
return(
   
      <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
        Home Page
      </Typography> 
      <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ marginTop: '30px' }}>
      {NAVIGATION.map((n)=>(
        <Grid item >
          <StyledPaper>
            {n.icon}
            <Typography variant="h5" sx={{ marginTop: '10px' }}>{n.title} List</Typography>
            <Link to={n.path} style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: '20px' }}
                endIcon={<ArrowForwardIcon />}
              >
                View {n.title}
              </Button>
            </Link>
          </StyledPaper>
        </Grid>
      ))}
      </Grid> 
    </div>
)
}
export default HomePage




  
 

