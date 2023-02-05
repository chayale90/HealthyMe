import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { API_URL, doApiGet } from '../../../services/apiService';
import { theme } from '../../../services/theme';
import { CircularProgress, ThemeProvider } from '@mui/material';
import FollowingItem from './followingItem';
import CheckUserActiveComp from '../../auth/checkComps/checkUserActiveComp';
import { toast } from 'react-toastify';


export default function FollowingsList({ usersSearch }) {
  const [ar, setAr] = useState([])
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const { userIdFollowings } = useSelector(myStore => myStore.dialogSlice);

  useEffect(() => {
    if (usersSearch)
      setAr([])
    doApiSearch()
  }, [usersSearch])

  useEffect(() => {
    loadMore()
  }, [])

  const loadMore = async () => {
    // Load additional items here and add them to the items array
    await doApiFollowings()
    setPage(page + 1);
  }

  const doApiFollowings = async () => {
    let url = API_URL + `/users/myFollowings/${userIdFollowings}?page=${page}`
    try {
      let resp = await doApiGet(url);
      // console.log(resp.data);
      if (resp.data.length === 0) {
        setHasMore(false);
        return;
      }
      setAr([...ar, ...resp.data])
      // Update the page and total pages variables
      setTotalItems(totalItems + resp.data.length);

      if (totalItems > resp.data.length) {
        setHasMore(false);
      }
    }
    catch (err) {
      console.log(err);
      toast.error("there problem ,try again later")
    }
  }

  const doApiSearch = async () => {
    //users/searchFollowings?s=
    let url = API_URL + `/users/searchFollowings/${userIdFollowings}?s=${usersSearch}`;
    try {
      let resp = await doApiGet(url);
      // console.log(resp.data);
      setAr(resp.data);
    }
    catch (err) {
      console.log(err);
      toast.error("there problem ,try again later")
    }
  }


  return (
    <div className='container '>
      <CheckUserActiveComp />
      <InfiniteScroll
        pageStart={page}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div style={{ display: "flex" }}>
            <div style={{ margin: "0 auto", color: "#A435F0" }} ><CircularProgress /></div>
          </div>
        }
      >
        <div>
          {ar.map((item, i) => {
            return (
              <FollowingItem key={item._id} index={i} item={item} />
            )
          })}
        </div>
      </InfiniteScroll>

    </div>
  )
}
