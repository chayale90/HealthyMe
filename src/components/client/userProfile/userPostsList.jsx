import React, { useEffect, useState } from 'react'
import { CircularProgress, ThemeProvider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { Fab } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import { API_URL, doApiGet } from '../../../services/apiService'
import PostItem from '../myProfile/postItem';
import { theme } from '../../../services/theme';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


export default function UserPostsList() {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const [ar, setAr] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [first, setFirst] = useState(true);

    const params = useParams();

    useEffect(() => {
        loadMore()
    }, [params["id"]])



    const loadMore = async () => {
        // Load additional items here and add them to the items array
        await doApiUserFoods()
        setPage(page + 1);
    }
    const doApiUserFoods = async () => {
        let url = API_URL + `/foods/userFoods/${params["id"]}?page=${page}`;
        try {
            let resp = await doApiGet(url);
            console.log(resp.data);
            setAr([...ar, ...resp.data])

            // Update the page and total pages variables
            setTotalItems(totalItems + resp.data.length);

            if (totalItems > resp.data.length) {
                setHasMore(false);
                setPage(1)

            }
        }
        catch (err) {
            console.log(err);
            toast.error("there problem, try later")
        }
    }

    return (
        <div className='container pt-5'>
            <hr />
            <InfiniteScroll
                pageStart={page}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={
                    ar.length>0&&
                    <div className="loader" key={0}>
                        <ThemeProvider theme={theme}>
                            <div style={{ display: "flex" }}>
                                <div style={{ margin: "0 auto", color: "#A435F0" }} ><CircularProgress /></div>
                            </div>
                        </ThemeProvider>
                    </div>
                }
            >
                <div className='row justify-content-center mt-4'>
                    {ar.map((item, i) => {
                        return (
                            <PostItem key={item._id} index={i} item={item} />
                        )
                    })}
                </div>
            </InfiniteScroll>


        </div>
    )
}
