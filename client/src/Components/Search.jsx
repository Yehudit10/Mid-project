import { AppBar, Toolbar, Typography,Paper ,InputBase,} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


const Search=(props)=>{
return(
    <AppBar position="fixed" component="nav" >
        <Toolbar >
    <Typography>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 ,marginLeft:'35vw'}}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, padding: '6px' }}
                    placeholder="SEARCH"
                    onChange={(e) => { props.setSearch(e.target.value) }}
                />
                <SearchIcon />
            </Paper>
            
</Typography>
</Toolbar>
    </AppBar>
)
}
export default Search