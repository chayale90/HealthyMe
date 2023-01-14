import { Avatar, IconButton, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./foodItem.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL, doApiGet } from "../../../services/apiService";

export default function FoodItem({ item, onLikeClick }) {
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const { user } = useSelector((myStore) => myStore.userSlice);

  useEffect(() => {
    doApiGetInfoUser();
  }, []);

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

  return (
    <React.Fragment>
      {item.active == true && (
        <div className="mainDiv p-0">
          <div className="p-2 overflow-hidden h-100">
            <img className="imgFood w-100 img" src={item.img_url} alt="imgFood" />

            <div className="mt-3 d-flex align-items-center justify-content-between w-100">
              <div className="d-flex align-items-center">
                <Avatar
                  sx={{ float: "start", width: 33, height: 33 }}
                  src={userImg}
                  alt="AvatarOfFood"
                />
                <Link style={{ fontWeight: 500 }} className="s16 ms-2 dark  underLine"
                  to={(user._id == item.user_id) ? "/myProfile" : "/userProfile/" + item.user_id}
                >
                  {userName}
                </Link>
              </div>

              <div>
                <Zoom in={true}>
                  <IconButton
                    onClick={() => {
                      onLikeClick(item._id, user._id);
                    }}
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