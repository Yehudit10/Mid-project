import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Post from './Post';
import AddPost from './AddPost';
import Search from '../Search';
import DateFilter from '../DateFilter';
import Sort from '../Sort';


const Posts = () => {

    const [PostsList, setPostsList] = useState([])
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [updateDates, setUpdateDates] = useState([])
    const SortBy = [{ name: "title", value: "title" }, { name: "last update date", value: "updatedAt" }, { name: "craete date", value: "createdAt" }]
    const url = useMemo(() => `http://localhost:1750/posts?sort=${SortBy.find(s => s.name === sort)?.value || ""}&update_date_end=${updateDates[1] || ""}&update_date_start=${updateDates[0] || ""}`
        , [updateDates, sort])
    useEffect(() => { getAllPosts() }, [updateDates, sort])
    const getAllPosts = async () => {
        try {
            const res = await axios.get(url)
            if (res.status === 200)
                setPostsList(res.data)

        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Search setSearch={setSearch} />
            <Box sx={{ display: 'flex',marginTop:10 }}>
                <Typography variant="h4" align="left" gutterBottom>
                    Posts
                </Typography>
                <Typography sx={{ display: 'flex', marginLeft: 60 }} variant="h4" align="right" gutterBottom>
                    <Sort setSort={setSort} SortBy={SortBy} sort={sort} />

                    <DateFilter setDates={setUpdateDates} />
                </Typography>
            </Box>

            <Box sx={{
                display: "flex",
                flexWrap: "wrap"
            }}>
                {PostsList.filter((post) => { return post.title?.includes(search) }).map((post) => { return <Post Post={post} setPostsList={setPostsList} url={url} /> })}
            </Box>
            <AddPost setPostsList={setPostsList} url={url} />
        </>
    )

}
export default Posts