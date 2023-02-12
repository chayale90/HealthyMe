import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { changeFavorites } from "../../../features/homeSlice"
import useScroll from '../../../hooks/useScroll';
import { API_URL, doApiGet } from '../../../services/apiService';
import MyInfo from '../../../services/myInfo';
import CheckUserComp from '../../auth/checkComps/checkUserComp';
import FoodFavoriteItem from './foodFavoriteItem';

export default function MyFavoriteList() {

  const dispatch = useDispatch();
  const [ar, setAr] = useState([]);
  const [endScreen, setEndScreenFalse] = useScroll(10);
  const [firstLoad, setFirstLoad] = useState(true)
  const [page,setPage] = useState(1);
  const [show,setShow] = useState("block")


  useEffect(() => {
    dispatch(changeFavorites({ val: "block" }))
    return () => {
      dispatch(changeFavorites({ val: "none" }))
    }
  }, [])

  useEffect(()=>{
    //get all foods that i liked them
    doApiFavoriteFood()
  },[page])

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

  const doApiFavoriteFood = async () => {
    let url = API_URL + "/foods/myLikeFoods?page="+page;
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
      toast.error("There problem, try again later")
    }
  };


  return (
    <div className="container mt-5">
      {/* <MyInfo /> */}
      <CheckUserComp />
      <div className="row justify-content-center">
        {ar.map((item, i) => {
          return (
            <FoodFavoriteItem
              key={item._id}
              index={i}
              item={item}

            />
          );
        })}
        {endScreen && <h1 style={{display:show}} className='diaplay-1'>Loading...</h1>}
        {/* {ar.length < 1 && <div className='display-6 text-center my-3' style={{ color: "#A435F0" }}>Loading...</div>} */}

      </div>
    </div>
  )
}
