import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../services/theme"
import { CircularProgress } from '@mui/material';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { changeFavorites } from "../../../features/homeSlice"
import { API_URL, doApiGet } from '../../../services/apiService';
import CheckUserComp from '../../auth/checkComps/checkUserComp';
import FoodFavoriteItem from './foodFavoriteItem';

export default function MyFavoriteList() {

  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);


  useEffect(() => {
    dispatch(changeFavorites({ val: "block" }))
    loadMore()
    return () => {
      dispatch(changeFavorites({ val: "none" }))
    }
  }, [hasNextPage])


  const loadMore = async () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
    try {
      let url = API_URL + "/foods/myLikeFoods?page=" + page;
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
    <div className="container mt-5">
      <ThemeProvider theme={theme}>
        <CheckUserComp />
        <div className="row justify-content-center">
          {items.map((item, i) => {
            return (
              <FoodFavoriteItem
                key={item._id}
                index={i}
                item={item}
              />
            );
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
      </ThemeProvider>
    </div>
  )
}
