import { Avatar, Button, IconButton, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../services/theme"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CheckUserComp from '../../auth/checkComps/checkUserComp';
import { setOpenFollowers, setOpenFollowings, setUserIdFollowers, setUserIdFollowings } from "../../../features/dialogSlice"
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import CheckUserActiveComp from '../../auth/checkComps/checkUserActiveComp';
import { toast } from 'react-toastify';
import UserPostsList from './userPostsList';
import { btnStyle, btnStyle2, btnStyle3 } from '../../../services/btnStyle';

export default function UserProfilePage() {
  const { user } = useSelector(myStore => myStore.userSlice);
  const [otherUser, setOtherUser] = useState({})
  const nav = useNavigate()
  console.log(user);
  const dispatch = useDispatch();
  const params = useParams();
  const [isFollow, setIsFollow] = useState(Boolean);
  const [first, setFirst] = useState(true);
  const [displayProgress, setDisplayProgress] = useState("none");

  // console.log("***************");
  // console.log(otherUser.followers);

  // console.log(params["id"]);

  useEffect(() => {
    doApi()
  }, [params["id"]])

  useEffect(() => {
    doApi()
  }, [isFollow])

  const doApi = async () => {
    try {
      const url = API_URL + "/users/userInfo/" + params["id"];
      const resp = await doApiGet(url);
      console.log(resp.data);
      setOtherUser(resp.data);
      if (resp.data.followers.includes(user._id)) {
        setIsFollow(true)
        setFirst(false)
      }
      else {
        setIsFollow(false)
        if (first != true)
          ClickDeleteFollow()
      }
    }
    catch (err) {
      console.log(err);
      toast.error("There problem try come back later");
    }
  };

  const onClickFollowers = () => {
    dispatch(setUserIdFollowers({ val: params["id"] }))
    dispatch(setOpenFollowers({ val: true }))
  }

  const onClickFollowings = () => {
    dispatch(setUserIdFollowings({ val: params["id"] }))
    dispatch(setOpenFollowings({ val: true }))
  }


  const onFollowClick = async () => {
    setDisplayProgress("flex")
    const url = API_URL + "/users/changeFollow/" + params["id"];
    try {
      let resp = await doApiMethod(url, "PATCH")
      console.log(resp.data);
      if (resp.data) {
        setIsFollow(!isFollow);
        setDisplayProgress("none")
      }
      else {
        toast.error("There problem, try again later")
        setDisplayProgress("none")
      }
    }
    catch (err) {
      console.log(err);
      toast.error("There problem try come back later");
      setDisplayProgress("none")

    }
  }

  //dialog open-close
  const [open, setOpen] = useState(false);

  // dialog Logout option functions
  const handleClose = () => {
    setOpen(false);
  };

  const ClickDeleteFollow = () => {
    setOpen(true);
  };

  //if for the avatar image
  let srcImg;
  if (otherUser.img_url == "" && otherUser.sex == "male") {
    srcImg = "/images/man.png"
  } else if (otherUser.img_url == "" && otherUser.sex == "female") {
    srcImg = "/images/woman.png"
  } else {
    srcImg = otherUser?.img_url
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        {(otherUser.name) ?
          <div className='container mt-md-5 mt-4'>
            <CheckUserActiveComp />
            <div className='d-flex'>

              <div className='d-none d-sm-block '>
                <Avatar
                  alt="myAvater"
                  src={srcImg}
                  sx={{ width: 160, height: 160 }}
                />
              </div>
              <div className='d-block d-sm-none'>
                <Avatar
                  alt="myAvater"
                  src={srcImg}
                  sx={{ width: 70, height: 70 }}
                />
              </div>

              <div className='ms-md-5 ms-2 mt-0 mt-sm-1'>
                <div className='d-flex'>

                  <h2 className='mb-3 s24'> {otherUser?.name} |<span className='purple'> {otherUser?.rank}</span> </h2>
                  <div className=' d-md-none d-block'>
                    <Button
                      onClick={onFollowClick}
                      endIcon={<CircularProgress sx={{ display: displayProgress }} size={"20px"} color={!isFollow ? "primary" : "success"} />}
                      style={{ float: "right" }}
                      className='loginBtn'
                      sx={!isFollow ? btnStyle2 : btnStyle}
                    >

                      {!isFollow ? "Follow" : "Foolowing "}
                    </Button>
                  </div>

                </div>
                <div className='d-flex mb-2 text-center'>

                  <div
                    className='me-3'>
                    {otherUser?.posts?.length} <span className='weight500'>
                      Posts
                    </span>
                  </div>

                  <div style={{ cursor: "pointer" }}
                    onClick={onClickFollowers}
                    className='underLine me-3'>
                    {otherUser?.followers?.length} <span className='weight500'>
                      Followers
                    </span>
                  </div>

                  <div style={{ cursor: "pointer" }}
                    onClick={onClickFollowings}
                    className='underLine '>
                    {otherUser?.followings?.length} <span className='weight500'>
                      Followings </span>
                  </div>
                </div>

                <div className='pb-2'>My motto: {otherUser?.info}</div>
                <div className='pb-2'>Location: {otherUser?.location}</div>

                <div>Coins: {otherUser?.score} <AttachMoneyIcon sx={{ color: '#DAA520' }} /></div>

              </div>

              <div className='ms-auto justify-content-end d-none d-md-block '>
                <Button
                  endIcon={<CircularProgress sx={{ display: displayProgress }} size={"20px"} color={!isFollow ? "primary" : "success"} />}
                  onClick={onFollowClick}
                  style={{ float: "right" }}
                  className='loginBtn px-4'
                  sx={!isFollow ? btnStyle2 : btnStyle}
                >

                  {!isFollow ? "Follow" : "Foolowing "}

                </Button>
              </div>

            </div>

          </div>
          :
          <div style={{ display: "flex", alignItems: "center", minHeight: '300px' }}>
            <div style={{ margin: "0 auto", color: "#A435F0" }}>
              <CircularProgress size={"100px"} />
            </div>
          </div>
        }

        <UserPostsList />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className='p-3'>
            <DialogTitle
              sx={{ mb: 0 }}
              id="alert-dialog-title">
              You are not following after {otherUser.name} now.
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>close</Button>

            </DialogActions>
          </div>
        </Dialog>

      </ThemeProvider>
    </div>
  )
}
