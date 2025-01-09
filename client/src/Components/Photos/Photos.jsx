import { Box, ImageList,Typography } from "@mui/material"
import axios from 'axios'
import { useEffect, useState,useMemo } from 'react'
import Search from '../Search'
import Photo from "./Photo"
import AddPhoto from "./AddPhoto"
import DateFilter from "../DateFilter"
import Sort from "../Sort"
const Photos=()=>{
    const [photosList, setPhotosList] = useState([])
    const [sort,setSort]=useState("")
    const [search, setSearch] = useState("")
    const [updateDates,setUpdateDates]=useState([])
    const SortBy=[{name:"image",value:"imgUrl"},{name:"title",value:"title"},{name:"last update date",value:"updatedAt"},{name:"craete date",value:"createdAt"}]
    useEffect(() => { getAllPhotos() }, [updateDates,sort])
    const getAllPhotos = async () => {
        try {
            const res = await axios.get(url)
            if (res.status === 200)
            setPhotosList(res.data)

        }
        catch (err) {
            console.error(err)
        }
    }
    const url=useMemo( ()=>`http://localhost:1750/photos?sort=${SortBy.find(s=>s.name===sort)?.value||""}&update_date_end=${updateDates[1]||""}&update_date_start=${updateDates[0]||""}`
        ,[updateDates,sort])
    return(<>
    <Search setSearch={setSearch}/>
            <Box sx={{display:'flex',marginTop:9}}>
            <Typography variant="h4" align="left" gutterBottom>
                Photos
            </Typography>
            <Typography sx={{display:'flex',marginLeft:60}} variant="h4" align="right" gutterBottom>
              <Sort setSort={setSort} SortBy={SortBy} sort={sort}/>
                <DateFilter setDates={setUpdateDates}/>
            </Typography>
            </Box>
            <AddPhoto setPhotosList={setPhotosList}  url={url}/>
            <ImageList sx={{height:1,overflow:'visible'}} cols={4} gap={8} rowHeight={300}>
            {photosList.filter((img)=>{return !search||img.title?.includes(search)}).map((photo) => { return <Photo Photo={photo} setPhotosList={setPhotosList} url={url}/> })}
            </ImageList>
    
    
    </>)
}
export default Photos