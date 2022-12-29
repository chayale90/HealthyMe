import { Avatar, IconButton, Zoom } from '@mui/material'
import React, { useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./foodItem.css"
import { useState } from 'react';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { resetUser } from "../../../features/userSlice"


export default function FoodItem({ item, doApi }) {
  const nav = useNavigate();
  const [icon, setIcon] = useState(<FavoriteBorderIcon />);
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const { user } = useSelector(myStore => myStore.userSlice);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    doApiGetInfoUser();
  }, [])

  useEffect(() => {
    changeLikeIcon()
  }, [doApi])

  const changeLikeIcon = () => {
    if (!item.likes.includes(user._id)) {
      setChecked(true);
      setIcon(<FavoriteBorderIcon />)
    }
    else {
      setChecked(true);
      setIcon(<FavoriteIcon sx={{ color: "red" }} />)
    }
  }

  const doApiGetInfoUser = async () => {
    try {
      let url = API_URL + "/users/userInfo/" + item.user_id;
      const resp = await doApiGet(url);
      // console.log(resp.data);
      setUserName(resp.data.name);
      setUserImg(resp.data.img_url)
    }
    catch (err) {
      console.log(err);
      toast.error("There problem try come back later")
    }
  }


  const onLikeClick = async () => {
    let url = API_URL + "/foods/changeLike/" + item._id
    try {
      let resp = await doApiMethod(url, "PATCH")
      // console.log(resp.data);
      if (resp.data) {
        doApi();
        setChecked((prev) => !prev);
      }
    }
    catch (err) {
      console.log(err);
      alert("There problem, or you try to change superAdmin to user")
    }
  }


  return (
    <React.Fragment>
      {item.active == true &&
        <div className='mainDiv col-10 col-xs-10 col-sm-10 col-md-5 col-lg-4 col-xl-3 p-0'>
          <div className='p-2 overflow-hidden h-100 '>

            <img className='imgFood w-100 img-fluid img' src={item.img_url} />

            <div className='mt-3 d-flex align-items-center justify-content-between w-100'>

              <div className='d-flex align-items-center'
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  //go to details of user
                  nav("/")
                }}>
                <Avatar
                  sx={{ float: 'start', width: 33, height: 33 }}
                  src={userImg} alt="AvatarOfFood"
                />
                <div style={{
                  fontWeight: 500
                }} className='s16 ms-2 dark userName'>{userName}</div>
              </div>

              <div>
                <Zoom in={checked}>
                  <IconButton
                    onClick={onLikeClick}
                    sx={{ width: 33, height: 33 }}
                    aria-label="add to favorites"
                  >
                    {icon}
                  </IconButton>
                </Zoom>
              </div>

            </div>

            <div className='s14 mt-2 ms-1 gray'>{item.name}</div>
            <div className='s14 ms-1 dark'>{item.likes.length} likes</div>
          </div>
        </div>
      }
    </React.Fragment >
  )
}
