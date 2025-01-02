import { ImageList } from "@mui/material"
import axios from 'axios'
import { useEffect, useState } from 'react'
import {  Typography } from '@mui/material'
import * as React from 'react';
import Search from '../Search'
import Photo from "./Photo"
import AddPhoto from "./AddPhoto"
const Photos=()=>{
    const [photosList, setPhotosList] = useState([])
    useEffect(() => { getAllPhotos() }, [])
    const getAllPhotos = async () => {
        try {
            const res = await axios.get('http://localhost:1750/photos')
            if (res.status === 200)
            setPhotosList(res.data)

        }
        catch (err) {
            console.error(err)
        }
    }
    const [search, setSearch] = useState("")

    return(<>
    
    <Search setSearch={setSearch}/>
            <br />
            <br />
            <br />
            <Typography variant="h4" align="left" gutterBottom>
                Photos
            </Typography>
            <AddPhoto setPhotosList={setPhotosList} />
            <ImageList sx={{height:1,overflow:'visible'}} cols={4} gap={8} rowHeight={300}>
            {photosList.map((photo) => { return <Photo Photo={photo} setPhotosList={setPhotosList} /> })}
            </ImageList>
    
    
    </>)
}
export default Photos