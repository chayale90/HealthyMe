import { Avatar, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NavBarMyProfile from './navBarMyProfile';
import CheckUserComp from '../../auth/checkComps/checkUserComp';
import { setOpenFollowers, setOpenFollowings } from "../../../features/dialogSlice"
import { setUserIdFollowers, setUserIdFollowings } from "../../../features/dialogSlice"
import MyInfo from '../../../services/myInfo';

export default function MyProfilePage() {
  const nav = useNavigate()
  const dispatch = useDispatch();

  const { user } = useSelector(myStore => myStore.userSlice);
  const [showPosts, setShowPosts] = useState("none")
  const [values, setValues] = useState({ button1: '#CCCCCC', button2: '#A435F0' });
  const [showInfo, setShowInfo] = useState("block")

  const clickOnPosts = () => {
    setValues({
      button1: "#A435F0",
      button2: "#CCCCCC",
    });
    setShowPosts("block")
    setShowInfo("none")
  }

  const onClickFollowers = () => {
    dispatch(setUserIdFollowers({ val: user._id }))
    dispatch(setOpenFollowers({ val: true }))
  }

  const onClickFollowings = () => {
    dispatch(setUserIdFollowings({ val: user._id }))
    dispatch(setOpenFollowings({ val: true }))
  }

  return (
    <div>
      <div className='container mt-md-5 mt-4'>
        <CheckUserComp />
        <MyInfo />
        <div className='d-flex '>

          <div className='d-none d-sm-block'>
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
            <h2 className='mb-3 s24'> {user?.name} |<span className='purple'> {user?.rank}</span> </h2>
            <div className='d-flex mb-2 text-center'>

              <div style={{ cursor: "pointer" }}
                onClick={clickOnPosts}
                className='underLine me-3'>
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

            <div >Coins: {user?.score}<AttachMoneyIcon sx={{ color: '#DAA520' }} />
            </div>
          </div>



          <div className='col text-end'>
            <Tooltip title={"Edit"} >
              <IconButton onClick={() => { nav("/editMyDetails") }} sx={{ border: "gray 0.5px solid" }}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <NavBarMyProfile setShowInfo={setShowInfo} showInfo={showInfo} clickOnPosts={clickOnPosts} setShowPosts={setShowPosts} showPosts={showPosts} setValues={setValues} values={values} />


    </div>
  )
}
