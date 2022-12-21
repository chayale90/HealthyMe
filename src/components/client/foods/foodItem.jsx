import { Avatar, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./foodItem.css"
import { useState } from 'react';
import { API_URL, doApiGet } from '../../../services/apiService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function FoodItem({ item }) {
  const [showIcon, setShowIcon] = useState(<FavoriteBorderIcon />);
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    doApiGetInfoUser();
  }, [])

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
    setShowIcon(<FavoriteIcon sx={{ color: "red" }} />)
    let bodyData;
    if (item.role == "user") {
      bodyData = { role: "admin" }
    }
    else {
      bodyData = { role: "user" }
    }
    let url = API_URL + "/users/changeRole/" + item._id
    try {
      let resp = await doApiMethod(url, "PATCH", bodyData)
      console.log(resp.data);
      if (resp.data) {
        props.doApi();
      }
    }
    catch (err) {
      console.log(err);
      alert("There problem, or you try to change superAdmin to user")
    }
  }

  return (
    <React.Fragment>
      <div className='col-lg-4 mainDiv p-0 '>
        <div className='p-2 overflow-hidden h-100 '>
          <img className='imgFood w-100' height={"200px"} src={item.img_url} />

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
              }} className='s16 ms-2'>{userName}</div>
            </div>

            <div>
              <IconButton
                onClick={onLikeClick}
                sx={{ width: 33, height: 33 }}
                aria-label="add to favorites"
              >
                {showIcon}
              </IconButton>
            </div>

          </div>
          <div className='s14 mt-2 ms-1'>{item.name}</div>
          <div className='s14 ms-1'>{item.likes.length} likes</div>
        </div>
      </div>
    </React.Fragment >
  )
}
