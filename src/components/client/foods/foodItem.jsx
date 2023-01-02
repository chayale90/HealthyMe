import { Avatar, IconButton, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./foodItem.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL, doApiGet, doApiMethod } from "../../../services/apiService";

export default function FoodItem({ item, setItems, items }) {
  const nav = useNavigate();
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const { user } = useSelector((myStore) => myStore.userSlice);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    doApiGetInfoUser();
  }, []);

//somthing

// if (dataCategories.length > 0) {
//   setAr([...dataCategories])
// }




  const doApiGetInfoUser = async () => {
    try {
      const url = API_URL + "/users/userInfo/" + item.user_id;
      const resp = await doApiGet(url);
      // console.log(resp.data);
      setUserName(resp.data.name);
      setUserImg(resp.data.img_url);
    } catch (err) {
      console.log(err);
      toast.error("There problem try come back later");
    }
  };

  // FoodModel - id: likes:[userId,]
  const onLikeClick = async () => {
    let url = API_URL + "/foods/changeLike/" + item._id;
    try {
      const resp = await doApiMethod(url, "PATCH");
      console.log(resp.data);
      if (resp.data) {

        const updatedFoodItems = items.map((foodItem) => {
          if (foodItem._id === item._id) {
            const isUserLikeFood = foodItem.likes.includes(user._id);
            const tempLikes = isUserLikeFood
              ? foodItem.likes.filter((userId) => userId != user._id)
              : [...foodItem.likes, user._id];

            return { ...foodItem, likes: tempLikes };
          }
          return foodItem;
        });
        console.log(updatedFoodItems);
        setItems([...updatedFoodItems]);
        setChecked(prev=>!prev)

      }
    } catch (err) {
      console.log(err);
      alert("There problem, or you try to change superAdmin to user");
    }
  };

  return (
    <React.Fragment>
      {item.active == true && (
        <div className="mainDiv p-0">
          <div className="p-2 overflow-hidden h-100">
            <img className="imgFood w-100 img" src={item.img_url} />

            <div className="mt-3 d-flex align-items-center justify-content-between w-100">
              <div
                className="d-flex align-items-center"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  //go to details of user
                  nav("/");
                }}
              >
                <Avatar
                  sx={{ float: "start", width: 33, height: 33 }}
                  src={userImg}
                  alt="AvatarOfFood"
                />
                <div
                  style={{
                    fontWeight: 500,
                  }}
                  className="s16 ms-2 dark userName"
                >
                  {userName}
                </div>
              </div>

              <div>
                <Zoom in={true}>
                  <IconButton
                    onClick={onLikeClick}
                    sx={{ width: 33, height: 33 }}
                    aria-label="add to favorites"
                  >
                    {!item.likes.includes(user._id) ? (
                      <FavoriteBorderIcon />
                    ) : (
                      <FavoriteIcon sx={{ color: "red" }} />
                    )}

                  </IconButton>
                </Zoom>
              </div>
            </div>

            <div className="s14 mt-2 ms-1 gray">{item.name}</div>
            <div className="s14 ms-1 dark">{item.likes.length} likes</div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}