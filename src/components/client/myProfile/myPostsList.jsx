import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../services/theme"
import { CircularProgress } from '@mui/material';
import { API_URL, doApiGet } from '../../../services/apiService'
import PostItem from './postItem';
import FabComp from '../../../services/fabComp';

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
            // console.log(resp.data);
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
            <ThemeProvider theme={theme}>
                <div className='row justify-content-center'>
                    {items.map((item, i) => {
                        return (
                            <PostItem key={item._id} index={i} item={item} />
                        )
                    })}
                    {(loading) && (
                        <div ref={sentryRef}>
                            <div style={{ display: "flex", alignItems: "center", minHeight: '100px' }}>
                                <div style={{ margin: "0 auto" }}>
                                    <CircularProgress size={"50px"} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

             <FabComp/>
                
            </ThemeProvider>
        </div>
    )
}
