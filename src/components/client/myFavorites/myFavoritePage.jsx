import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { changeFavorites, changeHome } from "../../../features/homeSlice"

export default function MyFavoritePage() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(changeFavorites({ val: "block" }))
    return()=>{
      dispatch(changeFavorites({ val: "none" }))
    }
  },[])

  return (
    <div>MyFavoritePage</div>
  )
}
