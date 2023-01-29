import { CircularProgress, ThemeProvider } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { theme } from "../../../services/theme";
import { API_URL, doApiGet, doApiMethod } from "../../../services/apiService";
import CheckUserComp from "../../auth/checkComps/checkUserComp";
import FoodItem from "./foodItem";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector } from "react-redux";
import { resetArSearch, setArSearch } from "../../../features/foodsSlice";
import MyInfo from "../../../services/myInfo"
export default function FoodsList({ hasMore }) {
  const { arSearch } = useSelector((myStore) => myStore.foodsSlice);
  const dispatch = useDispatch();

  const onLikeClick = async (id, idUser) => {
    console.log({ id });
    let url = API_URL + "/foods/changeLike/" + id;
    try {
      const resp = await doApiMethod(url, "PATCH");
      console.log({ resp });
      if (resp.data) {
        const tempList = [...arSearch];
        const updatedFoodItems = tempList.map((foodItem) => {
          if (foodItem._id === id) {
            const isUserLikeFood = foodItem.likes.includes(idUser);
            const tempLikes = isUserLikeFood
              ? foodItem.likes.filter((userId) => userId !== idUser)
              : [...foodItem.likes, idUser];

            return { ...foodItem, likes: tempLikes };
          }
          return foodItem;
        });

        dispatch(setArSearch({ val: [...updatedFoodItems] }));
      }
    } catch (err) {
      console.log(err);
      alert("There problem, or you try to change superAdmin to user");
    }
  };
  return (
    <div className="container">
      <MyInfo />
      <CheckUserComp />
      <div className="row justify-content-center">
        {arSearch.map((item, i) => {
          return (
            <FoodItem
              key={item._id}
              index={i}
              item={item}
              onLikeClick={onLikeClick}
            />
          );
        })}
      </div>
      {/* {hasMore && <h1>loading...</h1>} */}
    </div>
  );
}