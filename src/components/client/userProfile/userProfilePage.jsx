import { Avatar, Button, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckUserComp from '../../auth/checkComps/checkUserComp';
import { changeFavorites, changeHome } from "../../../features/homeSlice"
import { setOpenFollowers, setOpenFollowings } from "../../../features/dialogSlice"
import { useEffect } from 'react';
import { API_URL, doApiGet } from '../../../services/apiService';
import CheckUserActiveComp from '../../auth/checkComps/checkUserActiveComp';
import { toast } from 'react-toastify';
import UserPostsList from './userPostsList';
import { btnStyle2 } from '../../../services/btnStyle';

export default function UserProfilePage() {
  const [user, setUser] = useState({})
  const nav = useNavigate()
  // console.log(user);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(changeFavorites({ val: "none" }))
    dispatch(changeHome({ val: "none" }))
    doApi()
  }, [params["id"]])

  const doApi = async () => {
    try {
      const url = API_URL + "/users/userInfo/" + params["id"];
      const resp = await doApiGet(url);
      console.log(resp.data);
      setUser(resp.data);
    }
    catch (err) {
      console.log(err);
      toast.error("There problem try come back later");
    }
  };

  // const clickOnPosts = () => {
  //   setValues({
  //     button1: "#A435F0",
  //     button2: "#CCCCCC",
  //   });
  //   setShowPosts("block")
  //   setShowInfo("none")
  // }

  const onClickFollowers = () => {
    dispatch(setOpenFollowers({ val: true }))
  }

  const onClickFollowings = () => {
    dispatch(setOpenFollowings({ val: true }))
  }


  return (
    <div>
      <div className='container mt-md-5 mt-4'>
        <CheckUserActiveComp />
        <div className='d-flex '>

          <div className='d-none d-sm-block justify-content-between'>
            <Avatar
              alt="myAvater"
              src={user.img_url}
              sx={{ width: 160, height: 160 }}
            />
          </div>
          <div className='d-block d-sm-none'>
            <Avatar
              alt="myAvater"
              src={user.img_url}
              sx={{ width: 70, height: 70 }}
            />
          </div>

          <div className='ms-md-5 ms-2 mt-0 mt-sm-1'>
            <div className='d-flex'>

              <h2 className='mb-3 s24'> {user?.name} |<span className='purple'> {user?.rank}</span> </h2>
              <div className='ms-auto justify-content-end d-md-none d-block'>
                <Button
                  style={{ float: "right" }}
                  className=' loginBtn s18'
                  sx={btnStyle2}
                >
                  Follow
                </Button>
              </div>

            </div>
            <div className='d-flex mb-2 text-center'>

              <div
                className='me-3'>
                {user?.posts?.length} <span className='weight500'>
                  Posts
                </span>
              </div>

              <div style={{ cursor: "pointer" }}
                onClick={onClickFollowers}
                className='underLine me-3'>
                {user?.followers?.length} <span className='weight500'>
                  Followers
                </span>
              </div>

              <div style={{ cursor: "pointer" }}
                onClick={onClickFollowings}
                className='underLine '>
                {user?.followings?.length} <span className='weight500'>
                  Followings </span>
              </div>
            </div>

            <div className='pb-2'>My motto: {user?.info}</div>
            <div className='pb-2'>Location: {user?.location}</div>

            <div>Coins: {user?.score} <AttachMoneyIcon sx={{ color: '#DAA520' }} /></div>

          </div>


          <div className='ms-auto justify-content-end d-none d-md-block '>
                <Button
                  style={{ float: "right"}}
                  className=' loginBtn px-4'
                  sx={btnStyle2}
                >
                  Follow
                </Button>
              </div>
              
        </div>

        <UserPostsList />
      </div>


    </div>
  )
}
