import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { changeFavorites } from "../../../features/homeSlice"
import { API_URL, doApiGet } from '../../../services/apiService';
import MyInfo from '../../../services/myInfo';
import CheckUserComp from '../../auth/checkComps/checkUserComp';
import FoodFavoriteItem from './foodFavoriteItem';

export default function MyFavoriteList() {

  const dispatch = useDispatch();
  const [ar, setAr] = useState([]);


  useEffect(() => {
    dispatch(changeFavorites({ val: "block" }))

    //get all foods that i liked them
    doApiFavoriteFood()
    return () => {
      dispatch(changeFavorites({ val: "none" }))
    }

  }, [])


  const doApiFavoriteFood = async () => {
    let url = API_URL + "/foods/myLikeFoods";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data)
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
        {ar.length < 1 && <div className='display-6 text-center my-3' style={{ color: "#A435F0" }}>Loading...</div>}

      </div>
    </div>
  )
}
