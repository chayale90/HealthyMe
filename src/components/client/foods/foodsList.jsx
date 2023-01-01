import { CircularProgress, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { theme } from '../../../services/theme';
import { API_URL, doApiGet } from '../../../services/apiService';
import CheckUserComp from '../../auth/checkComps/checkUserComp';
import FoodItem from './foodItem'
import useScroll from '../../../hooks/useScroll';

export default function FoodsList(props) {
  const dataCategories = props.dataCategories;

  const [items, setItems] = useState([]);
  // const [arCats, setArCats] = useState([]);
  const [endScreen, endScreenEnd] = useScroll(900)
  const [page, setPage] = useState(1)
  const [firstLoad, setFirstLoad] = useState(true)
  const [showLoading, setShowLoading] = useState("flex")

  console.log(dataCategories);



  useEffect(() => {
    doApi()
  }, [dataCategories])

  useEffect(() => {
    //check if the page loading in the first time-its not do the action
    if (!firstLoad && endScreen) {
      console.log("end screen");
      setPage(page + 1)
    }
    setFirstLoad(false)
  }, [endScreen])


  const doApi = async () => {
    let url = API_URL + "/foods/?page=" + page;
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setItems([...items, ...resp.data]);

      if (dataCategories.length > 0) {
        setItems([...dataCategories])
      }
      //return the toggle (that check if we in the end of scroll) to false
      endScreenEnd
      setShowLoading("none")
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

        {items.map((item, i) => {
          return (
            <FoodItem page={page} key={item._id} index={i} item={item} />
          )
        })}

        <ThemeProvider theme={theme}>
          <div style={{ display: showLoading, alignItems: 'center' }}>
            <div style={{ margin:"0 auto" }} ><CircularProgress /></div>
          </div>
        </ThemeProvider>

      </div>
    </div>

  )
}
