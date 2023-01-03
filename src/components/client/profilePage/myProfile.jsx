import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SettingsIcon from '@mui/icons-material/Settings';
import "./myProfile.css"
import { IconBase } from 'react-icons';
import { Link } from 'react-router-dom';


export default function MyProfile() {
  const { user } = useSelector(myStore => myStore.userSlice)
  console.log(user);

  return (

    <div className='container'>
      <div className='row'>
        <div className='d-flex my-4'>
          <Avatar
            alt="myAvater"
            src={user.img_url}
            sx={{ width: 160, height: 160 }}
          />
          <div className='ms-5 mt-3'>
            <h2 className='mb-4'> {user?.name}</h2>

            <div className='d-flex mb-3'>
              <div className='me-3 underLine'><Link> {"4"} Post</Link> </div>
              <div className='me-3 underLine'><Link> {user?.followings?.length} Followings</Link></div>
              <div className=''><Link>{user?.followers?.length} Followers</Link></div>
            </div>

            <div>{user?.info}</div>
          </div>
          <div className='col text-end'> <IconButton sx={{ border: "gray 1px solid" }}><SettingsIcon /></IconButton></div>
        </div>
      </div>


      <div className='row'>






      </div>







    </div>
  )
}
