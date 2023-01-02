import { CircularProgress, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { theme } from '../../../services/theme';
import { API_URL, doApiGet } from '../../../services/apiService';
import CheckUserComp from '../../auth/checkComps/checkUserComp';
import FoodItem from './foodItem'
import InfiniteScroll from 'react-infinite-scroller';

export default function FoodsList({ dataCategories }) {

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    loadMore()
  }, [dataCategories])


  const loadMore = async () => {
    // Load additional items here and add them to the items array
    await doApi()
    setPage(page + 1);
  }

  const doApi = async () => {
    let url = API_URL + "/foods/?page=" + page
    try {
      let resp = await doApiGet(url);
      console.log(resp);

      // Add the items to the list
      setItems([...items, ...resp.data]);
      
      if (dataCategories.length > 0) {
        setItems([...dataCategories])
      }

      // Update the page and total pages variables
      setTotalItems(totalItems + resp.data.length);
      console.log(totalItems);


      // setHasMore(false) if there are no more items to load
      if (totalItems > resp.data.length) {
        setHasMore(false);
        setPage(1);
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
        loader={
          <div className="loader" key={0}>
            <ThemeProvider theme={theme}>
              <div style={{ display: "flex" }}>
                <div style={{ margin: "0 auto", color: "#A435F0" }} ><CircularProgress /></div>
              </div>
            </ThemeProvider>
          </div>
        }
      >
        <div className='row justify-content-center'>
          {items.map((item, i) => {
            return (
              <FoodItem key={item._id} index={i} item={item} setItems={setItems} items={items} />
            )
          })}
        </div>
      </InfiniteScroll>

    </div>

  )
}
