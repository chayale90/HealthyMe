import { Avatar, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./foodItem.css"
import { useState } from 'react';
import { API_URL, doApiGet } from '../../../services/apiService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function FoodItem({ item }) {
  const [showIcon, setShowIcon] = useState(<FavoriteBorderIcon />);
  const [userName, setUserName] = useState([]);
  const [userImg, setUserImg] = useState([]);
  // console.log(userInfo);

  useEffect(() => {
    doApiGetInfoUser();
  }, [])

  const doApiGetInfoUser = async () => {
    try {
      let url = API_URL + "/users/userInfo/" + item.user_id;
      const resp = await doApiGet(url);
      console.log(resp.data);
      setUserName(resp.data.name);
      setUserImg(resp.data.img_url)
    }
    catch (err) {
      console.log(err);
      toast.error("There problem try come back later")
    }
  }

  return (
    <React.Fragment>

      <div className='col-lg-4 mainDiv p-0 '>
        <div className='p-2 overflow-hidden h-100 '>
          <img className='imgFood w-100' height={"200px"} src={item.img_url} />

          <div className='mt-3 d-flex align-items-center justify-content-between w-100'>

            <div className='d-flex align-items-center '>
              <Avatar sx={{ float: 'start', width: 33, height: 33 }}
                alt="AvatarOfFood" src={userImg}
              />
              <Link style={{
                textDecoration: "none",fontWeight: 500}} className='s16 ms-2'>{userName}</Link>
          </div>

          <div>
            <IconButton
              onClick={() => {
                setShowIcon(<FavoriteIcon sx={{ color: "red" }} />)
              }}
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
