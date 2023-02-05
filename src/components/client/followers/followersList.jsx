import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { API_URL, doApiGet } from '../../../services/apiService';
import CheckUserActiveComp from '../../auth/checkComps/checkUserActiveComp';
import FollowerItem from './followerItem';
import { theme } from '../../../services/theme';
import { CircularProgress, ThemeProvider } from '@mui/material';
import { toast } from 'react-toastify';


export default function FollowersList({ usersSearch }) {
  const [ar, setAr] = useState([])
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const { userIdFollowers } = useSelector(myStore => myStore.dialogSlice);
  // console.log(userIdFollowers);


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
    await doApiFollowers()
    setPage(page + 1);
  }

  const doApiFollowers = async () => {
    let url = API_URL + `/users/myFollowers/${userIdFollowers}?page=${page}`
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
    //users/searchFollowers?s=
    let url = API_URL + `/users/searchFollowers/${userIdFollowers}?s=${usersSearch}`;
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
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
              <FollowerItem key={item._id} index={i} item={item} />
            )
          })}

        </div>
      </InfiniteScroll>

    </div>
  )
}
