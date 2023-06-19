//3rd library
import React, { useEffect, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
// project imports
import { API_URL, doApiGet } from '../../../services/apiService'
import PostItem from '../myProfile/postItem';
import FabComp from '../../../services/fabComp';
import LoadingComp from '../../general_comps/loadingComp';

export default function UserPostsList() {
    const nav = useNavigate();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const params = useParams();

    useEffect(() => {
        loadMore()
    }, [hasNextPage])

    const loadMore = async () => {
        setLoading(true);
        setPage(prevPage => prevPage + 1);
        let url = API_URL + `/foods/userFoods/${params["id"]}?page=${page}`;
        try {
            let resp = await doApiGet(url);
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
        <div className='container pt-5'>
            <hr />
            <div className='row justify-content-center mt-5'>
                {items.map((item, i) => {
                    return (
                        <PostItem key={item._id} index={i} item={item} />
                    )
                })}

                {(loading) && (
                    <div ref={sentryRef}>
                                      <LoadingComp minHeight="100px" size="50px"/>

                    </div>
                )}
            </div>
          <FabComp/>
        </div>
    )
}
