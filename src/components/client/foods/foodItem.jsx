import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./foodItem.css"
import { useState } from 'react';
export default function FoodItem({ item }) {


  const [showIcon, setShowIcon] = useState(<FavoriteBorderIcon  />);

  return (
    <div className='col-lg-4 mainDiv p-0 '>
      <div className='p-2 overflow-hidden h-100 '>
        <img className='imgFood w-100' height={"200px"} src={item.img_url} />

        <div className='mt-3 d-flex align-items-center justify-content-between w-100'>

          <div className='d-flex align-items-center '>
            <Avatar sx={{ float: 'start', width: 33, height: 33 }}
              alt="AvatarOfFood" src={""}
            />
            <div className='s16 ms-2'>name of user</div>
          </div>

          <div>
            <IconButton
              onClick={()=>{
                setShowIcon(<FavoriteIcon sx={{color:"red"}}/>)
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
  )
}
