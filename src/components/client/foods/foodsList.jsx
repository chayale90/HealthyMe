import { CircularProgress, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { theme } from '../../../services/theme';
import { API_URL, doApiGet } from '../../../services/apiService';
import CheckUserComp from '../../auth/checkComps/checkUserComp';
import FoodItem from './foodItem'
import useScroll from '../../../hooks/useScroll';

export default function FoodsList(props) {
  const dataCat = props.dataCat;

  const [ar, setAr] = useState([]);
  // const [arCats, setArCats] = useState([]);
  const [endScreen, endScreenEnd] = useScroll(900)
  const [page, setPage] = useState(1)
  const [firstLoad, setFirstLoad] = useState(true)
  const [show, setShow] = useState("flex")

  console.log(dataCat);

  useEffect(() => {
    doApiPage()
  }, [page])

  useEffect(() => {
    doApi()
  }, [dataCat])

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
    let url = API_URL + "/foods"
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);

      setAr([...resp.data]);

      if (dataCat.length > 0) {
        setAr([...dataCat])
      }
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
      setShow("none")
    }
    catch (err) {
      console.log(err);
      toast.error("there problem ,try again later")
    }
  }


  return (
    <div className='container '>
      <CheckUserComp />
      <div className='row justify-content-center '>

        {ar.map((item, i) => {
          return (
            <FoodItem page={page} key={item._id} index={i} item={item} doApiPage={doApiPage} doApi={doApi} />
          )
        })}

        <ThemeProvider theme={theme}>
          <div style={{ display: show, alignItems: 'center' }}>
            <div style={{ margin:"0 auto" }} ><CircularProgress /></div>
          </div>
        </ThemeProvider>

      </div>
    </div>

  )
}
