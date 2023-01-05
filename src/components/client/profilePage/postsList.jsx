import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../../services/apiService'
import PostItem from './postItem';
import AddIcon from '@mui/icons-material/Add';
import { Fab, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function PostsList() {
    const nav = useNavigate();
    const [ar, setAr] = useState([]);

    useEffect(() => {
        doApiMyFoods()
    }, [])

    const doApiMyFoods = async () => {
        let url = API_URL + "/foods/myFoods"
        try {
            let resp = await doApiGet(url);
            setAr(resp.data)
            console.log(resp.data);
        }
        catch (err) {
            console.log(err);
            toast.error("there problem, try later")
        }
    }

    return (
        <div>

            <div className='row justify-content-center'>
                {ar.map((item, i) => {
                    return (
                        <PostItem key={item._id} index={i} item={item} />
                    )
                })}
            </div>

            <Fab
                sx={{ background: "#A435F0", color: "white", "&:hover": { color: "white", background: "#912CD6" }, position: 'sticky', bottom: 70, left: 1900 }}
                onClick={() => { nav("/addFood") }}
                aria-label="addFood">
                <AddIcon />
            </Fab>
        </div>
    )
}
