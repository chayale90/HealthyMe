import { CircularProgress, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { theme } from '../../../services/theme';
import { API_URL, doApiGet } from '../../../services/apiService';
import CheckUserComp from '../../auth/checkComps/checkUserComp';
import FoodItem from './foodItem'
import InfiniteScroll from 'react-infinite-scroller';

export default function FoodsList() {

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);



  useEffect(() => {
    loadMore()
  }, [])


  const loadMore = async () => {
    // Load additional items here and add them to the items array
    await doApi()
    setPage(page + 1);

  }

  const doApi = async () => {
    let url = API_URL + "/foods/?page=" + page
    try {
      let { data } = await doApiGet(url);
      console.log(data);

      // Add the items to the list
      setItems([...items, ...data]);

      // Update the page and total pages variables
      setTotalItems(totalItems + data.length);
      console.log(totalItems);


      // setHasMore(false) if there are no more items to load
      if (totalItems > data.length) {
        setHasMore(false);
      }

      setTotalPages(Math.floor(totalItems / page));
      console.log(totalItems);
      console.log(totalPages);

    }

    catch (err) {
      console.log(err);
      toast.error("there problem ,try again later")
    }
  }
  const load = async () => {
    // Load additional items here and add them to the items array
    await doApi()
    setPage(1);
    setHasMore(true);

  }

  return (
    <div className='container '>
      <CheckUserComp />
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <div className='row justify-content-center'>
          {items.map((item, i) => {
            return (
              <FoodItem key={item._id} index={i} item={item} load={load} loadMore={loadMore} doApiPage={""} doApi={doApi} />
            )
          })}
        </div>
      </InfiniteScroll>


    </div>

  )
}
