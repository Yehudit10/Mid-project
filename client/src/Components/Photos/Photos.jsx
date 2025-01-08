import { Box, ImageList,Typography } from "@mui/material"
import axios from 'axios'
import { useEffect, useState,useMemo } from 'react'
import Search from '../Search'
import Photo from "./Photo"
import AddPhoto from "./AddPhoto"
import DateFilter from "../DateFilter"
const Photos=()=>{
    
    const [updateDates,setUpdateDates]=useState([])
    useEffect(() => { 
        getAllPhotos() }, [updateDates])
    const [photosList, setPhotosList] = useState([])
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
    const [search, setSearch] = useState("")
    const url=useMemo( ()=>`http://localhost:1750/photos?update_date_end=${updateDates[1]||""}&update_date_start=${updateDates[0]||""}`
        ,[updateDates])
    return(<>
    
    <Search setSearch={setSearch}/>
            <br />
            <br />
            <br />
            <Box sx={{display:'flex'}}>
            <Typography variant="h4" align="left" gutterBottom>
                Photos
            </Typography>
            <Typography sx={{display:'flex',marginLeft:70}} variant="h4" align="right" gutterBottom>
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