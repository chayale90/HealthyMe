import React, { useEffect, useState } from 'react'
import { List, ListItem } from '@mui/material';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../../services/apiService';
import FollowerItem from "./followerItem";

export default function FollowersList() {
  const { userIdFollowers } = useSelector(myStore => myStore.dialogSlice);

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
    try {
      let url = API_URL + `/users/myFollowers/${userIdFollowers}?page=${page}`;
      let resp = await doApiGet(url);
      setItems([...items, ...resp.data]);
      setHasNextPage(resp.data.length ==0);
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
    <List>
      {items.map((item, i) => {
        return (
          <FollowerItem key={item._id} index={i} item={item} />
        )
      })}
      {(loading ) && (
        <ListItem ref={sentryRef}>
          <div>Loading...</div>
        </ListItem>
      )}
    </List>
  );
};