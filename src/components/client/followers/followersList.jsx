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
import useScrollFollowers from '../../../hooks/useScrollFollowers';


export default function FollowersList() {
  const [ar, setAr] = useState([])
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [endScreen, setEndScreenFalse] = useScrollFollowers(200);
  const [firstLoad, setFirstLoad] = useState(true)
  const [page, setPage] = useState(1);
  const [show, setShow] = useState("block")


  const { userIdFollowers } = useSelector(myStore => myStore.dialogSlice);
  // console.log(userIdFollowers);



  useEffect(() => {
    //get all Followers 
    doApiFollowers()
  }, [page])

  useEffect(() => {
    console.log("end screen hook")
    // בודק אם הדף רק נטען ולא יפעיל את הפקודה
    if (!firstLoad && endScreen) {
      setPage(page + 1)
    }
    setFirstLoad(false);
    // לנסות לעשות שמגיעים לסוף הדף 
    // שיציג את ה10 הסרטונים הביאם שיתווספו לרשימה
  }, [endScreen])
  
  const doApiFollowers = async () => {
    let url = API_URL + `/users/myFollowers/${userIdFollowers}?page=${page}`
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr([...ar, ...resp.data])
      // מחזיר את הטוגל של בדיקה אם אנחנו בסוף העמוד הגלילה
      // בחזרה לפולס
      setEndScreenFalse()
      setShow("none")
    }
    catch (err) {
      console.log(err);
      toast.error("there problem ,try again later")
    }
  }



  return (
    <div className='container '>
      <CheckUserActiveComp />
      <div>
        {ar.map((item, i) => {
          return (
            <FollowerItem key={item._id} index={i} item={item} />
          )
        })}
        {endScreen && <h1 style={{display:show}} className='diaplay-1'>Loading...</h1>}
      </div>

    </div>
  )
}
