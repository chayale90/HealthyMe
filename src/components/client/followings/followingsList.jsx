import React, { useEffect, useState } from 'react'
import { List } from '@mui/material';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../../services/apiService';
import FollowingItem from "./followingItem";
import CheckUserActiveComp from '../../auth/checkComps/checkUserActiveComp';
import LoadingComp from '../../general_comps/loadingComp';

export default function FollowersList({ usersSearch }) {
  const { userIdFollowings } = useSelector(myStore => myStore.dialogSlice);

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    loadMore()
  }, [hasNextPage])

  useEffect(() => {
    if (usersSearch)
      doApiSearch()
  }, [usersSearch])

  const loadMore = async () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
    try {
      let url = API_URL + `/users/myFollowings/${userIdFollowings}?page=${page}`;
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

  const doApiSearch = async () => {
    //users/searchFollowers?s=
    let url = API_URL + `/users/searchFollowings/${userIdFollowings}?s=${usersSearch}`;
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setItems([...resp.data]);
    }
    catch (err) {
      console.log(err);
      toast.error("there problem ,try again later")
    }
  }

  const { sentryRef } = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 600px 0px 0px',
  });

  return (
    <List>
      <CheckUserActiveComp />
      {items.map((item, i) => {
        return (
          <FollowingItem key={item._id} index={i} item={item} />
        )
      })}
      {(loading) && (
        <div ref={sentryRef}>
          <LoadingComp minHeight="100px" size="40px" />
        </div>
      )}
    </List>
  );
};