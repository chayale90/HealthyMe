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


export default function PostsList() {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const [ar, setAr] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        loadMore()
    }, [])

    const loadMore = async () => {
        // Load additional items here and add them to the items array
        await doApiMyFoods()
        setPage(page + 1);
    }
    const doApiMyFoods = async () => {
        let url = API_URL + `/foods/myFoods?page=${page}`
        try {
            let resp = await doApiGet(url);
            setAr([...ar, ...resp.data])
            console.log(resp.data);

            // Update the page and total pages variables
            setTotalItems(totalItems + resp.data.length);

            if (totalItems > resp.data.length) {
                setHasMore(false);
            }
        }
        catch (err) {
            console.log(err);
            toast.error("there problem, try later")
        }
    }

    return (
        <div>

            <InfiniteScroll
                pageStart={page}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={
                    <div className="loader" key={0}>
                        <ThemeProvider theme={theme}>
                            <div style={{ display: "flex" }}>
                                <div style={{ margin: "0 auto", color: "#A435F0" }} ><CircularProgress /></div>
                            </div>
                        </ThemeProvider>
                    </div>
                }
            >
                <div className='row justify-content-center'>
                    {ar.map((item, i) => {
                        return (
                            <PostItem key={item._id} index={i} item={item} />
                        )
                    })}
                </div>
            </InfiniteScroll>

            <Fab
                sx={{ background: "#A435F0", color: "white", "&:hover": { color: "white", background: "#912CD6" }, position: 'sticky', bottom: 70, left: 1900 }}
                onClick={() => { nav("/addFood") }}
                aria-label="addFood">
                <AddIcon />
            </Fab>
        </div>
    )
}
