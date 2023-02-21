import React, { useEffect, useState } from 'react'
import { List, ListItem } from '@mui/material';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { API_URL, doApiGet } from '../../../services/apiService';
import FollowerItem from "./followerItem";
import CheckUserActiveComp from '../../auth/checkComps/checkUserActiveComp';

export default function FollowersList({ usersSearch }) {
  const { userIdFollowers } = useSelector(myStore => myStore.dialogSlice);

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
      let url = API_URL + `/users/myFollowers/${userIdFollowers}?page=${page}`;
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


  const doApiSearch = async () => {
    //users/searchFollowers?s=
    let url = API_URL + `/users/searchFollowers/${userIdFollowers}?s=${usersSearch}`;
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
    <div>
      <CheckUserActiveComp />
      {items.map((item, i) => {
        return (
          <FollowerItem key={item._id} index={i} item={item} />
        )
      })}
      {(loading) && (
        <div ref={sentryRef}>
          <div style={{ display: "flex", alignItems: "center", minHeight: '100px' }}>
            <div style={{ margin: "0 auto", color: "#A435F0" }}>
              <CircularProgress size={"40px"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};