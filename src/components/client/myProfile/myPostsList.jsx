import React, { useEffect, useState } from 'react'
import { CircularProgress, ThemeProvider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import { API_URL, doApiGet } from '../../../services/apiService'
import PostItem from './postItem';
import { theme } from '../../../services/theme';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useScroll from '../../../hooks/useScroll';


export default function MyPostsList() {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const [ar, setAr] = useState([])
    const [endScreen, setEndScreenFalse] = useScroll(0);
    const [firstLoad, setFirstLoad] = useState(true)
    const [page, setPage] = useState(1);
    const [show, setShow] = useState("block")


    useEffect(() => {
        //get all Followers 
        doApiMyFoods()
    }, [page])

    useEffect(() => {
        console.log("end screen hook")
        // בודק אם הדף רק נטען ולא יפעיל את הפקודה
        if (!firstLoad && endScreen) {
            setPage(page + 1)
        }
        setFirstLoad(false);
        // לנסות לעשות שמגיעים לסוף הדף 
        // שיציג את ה10 הסרטונים הביאם שיתווספו לרשימה
    }, [endScreen])

    const doApiMyFoods = async () => {
        let url = API_URL + `/foods/myFoods?page=${page}`
        try {
            let resp = await doApiGet(url);
            console.log(resp.data);
            setAr([...ar, ...resp.data])

            setEndScreenFalse()
            setShow("none")

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
                {endScreen && <h1 style={{ display: show }} className='diaplay-1'>Loading...</h1>}

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
