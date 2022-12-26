import {  CircularProgress, Fab, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Box } from '@mui/system';
import { theme } from '../../../services/theme';
import { API_URL, doApiGet } from '../../../services/apiService';
import CheckUserComp from '../../auth/checkComps/checkUserComp';
import FoodItem from './foodItem'
import useScroll from '../../hooks/useScroll';

export default function FoodsList() {
  const [ar, setAr] = useState([]);
  const [endScreen, endScreenEnd] = useScroll(900)
  const [page, setPage] = useState(1)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    doApiPage()
  }, [page])

  useEffect(() => {
    doApi()
  }, [])

  useEffect(() => {
    //check if the page loading in the first time-its not do the action
    if (!firstLoad && endScreen) {
      console.log("end screen");
      setPage(page + 1)
    }
    setFirstLoad(false)
  }, [endScreen])

  const doApi = async () => {
    // let page = querys.get("page") || 1;
    let url = API_URL + "/foods/?page=" + page;
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
      //return the toggle (that check if we in the end of scroll) to false
      // endScreenEnd
    }
    catch (err) {
      console.log(err);
      toast.error("there problem ,try again later")
    }
  }

  const doApiPage = async () => {
    let url = API_URL + "/foods/?page=" + page;
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr([...ar, ...resp.data]);
      //return the toggle (that check if we in the end of scroll) to false
      endScreenEnd
    }
    catch (err) {
      console.log(err);
      toast.error("there problem ,try again later")
    }
  }

  return (
    <div className='container mt-5'>
      <CheckUserComp />
      <div className='row justify-content-center'>

        {ar.map((item, i) => {
          return (
            <FoodItem page={page} key={item._id} index={i} item={item} doApiPage={doApiPage} doApi={doApi} />
          )
        })}

        <ThemeProvider theme={theme}>
          {endScreen &&
            <Box sx={{ display: "flex", minHeight: "100px", justifyContent: "center" }}><CircularProgress /></Box>
            // <h2 className='display-6 text-center'>Loading...</h2>
          }
        </ThemeProvider>


      </div>
    </div>

  )
}
