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
  const [endScreen, setEndScreenFalse] = useScroll(600);
  const [firstLoad, setFirstLoad] = useState(true)
  const [page, setPage] = useState(1);
  const [show, setShow] = useState("block")


  useEffect(() => {
    dispatch(changeFavorites({ val: "block" }))
    doApiFavoriteFood()
  }, [page])

  useEffect(() => {
    return () => {
      dispatch(changeFavorites({ val: "none" }))
      setAr([])
    }
  }, [])

  useEffect(() => {
    console.log("end screen hook")
    if (!firstLoad && endScreen) {
      setPage(page + 1)
    }
    setFirstLoad(false);
  }, [endScreen])

  const doApiFavoriteFood = async () => {
    let url = API_URL + "/foods/myLikeFoods?page=" + page;
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr([...ar, ...resp.data])
      //return the toggle of end of page to false
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
        {endScreen && <h1 style={{ display: show }} className='diaplay-1 text-center'>Loading...</h1>}
      </div>
    </div>
  )
}
