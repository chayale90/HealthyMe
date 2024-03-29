import { Avatar, Button, IconButton, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL, doApiGet } from "../../../services/apiService";
import "./foodItem.css";

export default function FoodItem({ item, onLikeClick }) {

  const { user } = useSelector((myStore) => myStore.userSlice);
  const nav = useNavigate()
  const [isHovered, setIsHovered] = useState(false);
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    doApiGetInfoUser();
  }, []);


  const srcImg = React.useMemo(() => {
    if (otherUser.img_url == "" && otherUser.sex == "male") {
        return "/images/man.png";
    } else if (otherUser.img_url == "" && otherUser.sex == "female") {
        return "/images/woman.png";
    } else {
      return `${otherUser.img_url}`;
    }
}, [otherUser]);


  const doApiGetInfoUser = async () => {
    try {
      const url = API_URL + "/users/userInfo/" + item.user_id;
      const resp = await doApiGet(url);
      // console.log(resp.data);
      setOtherUser(resp.data)
    } catch (err) {
      console.log(err);
      toast.error("There problem try come back later");
    }
  };

  return (
    <React.Fragment>
      {item.active == true && (
        <div className="mainDiv p-0">
          <div
            className="p-2 overflow-hidden h-100">
            <div className={isHovered ? 'lightDiv' : ''}
              style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                onClick={() => { user._id == item.user_id ? nav("/myFoodInfo/" + item._id) : nav("/foodInfo/" + item._id) }}
                className='imgFood w-100'
                src={`${item?.img_url}?${Date.now()}`} 
                alt="imgFood"
              />

              {isHovered &&
                <IconButton
                  className="eyeBTN"
                  onClick={() => { user._id == item.user_id ? nav("/myFoodInfo/" + item._id) : nav("/foodInfo/" + item._id) }}
                  style={{ position: 'absolute', padding: 0 }}>
                  <VisibilityIcon className="eyeBTN" sx={{ fontSize: "40px" }} />
                </IconButton>
              }

            </div>

            <div className="mt-3 d-flex align-items-center justify-content-between w-100">
              <div className="d-flex align-items-center">
                <Avatar
                  sx={{ float: "start", width: 33, height: 33 }}
                  src={srcImg}
                  alt="AvatarOfFood"
                />
                <Link style={{ fontWeight: 500 }} className="s16 ms-2 dark  underLine"
                  to={(user._id == item.user_id) ? "/myProfile" : "/userProfile/" + item.user_id}
                >
                  {otherUser.name}
                </Link>
              </div>

              <div>
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