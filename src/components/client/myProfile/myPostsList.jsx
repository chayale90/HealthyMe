import React, { useEffect, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';
import { API_URL, doApiGet } from '../../../services/apiService'
import PostItem from './postItem';
import { toast } from 'react-toastify';


export default function MyPostsList() {
    const nav = useNavigate();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);


    useEffect(() => {
        loadMore()
    }, [hasNextPage])

    const loadMore = async () => {
        setLoading(true);
        setPage(prevPage => prevPage + 1);
        let url = API_URL + `/foods/myFoods?page=${page}`
        try {
            let resp = await doApiGet(url);
            console.log(resp.data);
            setItems([...items, ...resp.data]);
            setHasNextPage(resp.data.length == 0);
            setLoading(false);

        } catch (err) {
            setError(err);
            setLoading(false);
            console.log(err);
            toast.error("there problem ,try again later");
        }
    };

    const { sentryRef } = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: loadMore,
        disabled: !!error,
        rootMargin: '0px 600px 0px 0px',
    });

    return (
        <div>
            <div className='row justify-content-center'>
                {items.map((item, i) => {
                    return (
                        <PostItem key={item._id} index={i} item={item} />
                    )
                })}
                {(loading) && (
                    <div ref={sentryRef}>
                        <div>Loading...</div>
                    </div>
                )}
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
