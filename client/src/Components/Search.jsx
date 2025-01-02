import { AppBar, Toolbar, Typography } from '@mui/material'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const Search=(props)=>{
return(
    <Typography>
    <AppBar position="fixed" component="nav">
        <Toolbar>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: 80 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, padding: '6px' }}
                    placeholder="SEARCH"
                    onChange={(e) => { props.setSearch(e.target.value) }}
                />
                <SearchIcon />
            </Paper>
        </Toolbar>
    </AppBar>
</Typography>
)
}
export default Search