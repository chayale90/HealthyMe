//3rd library
import { Avatar, Button, IconButton, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
// project imports
import { theme } from "../../../services/theme"
import { setOpenFollowers, setOpenFollowings, setUserIdFollowers, setUserIdFollowings } from "../../../features/dialogSlice"
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import CheckUserActiveComp from '../../auth/checkComps/checkUserActiveComp';
import UserPostsList from './userPostsList';
import { btnStyle, btnStyle2 } from '../../../services/btnStyle';

export default function UserProfilePage() {
  const { user } = useSelector(myStore => myStore.userSlice);
  const [otherUser, setOtherUser] = useState({})
  const dispatch = useDispatch();
  const params = useParams();
  const [isFollow, setIsFollow] = useState(Boolean);
  const [first, setFirst] = useState(true);
  const [displayProgress, setDisplayProgress] = useState("none");

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
      // console.log(resp.data);
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
  const [isOpen, setIsOpen] = useState(Boolean);

  // dialog Logout option functions
  const handleClose = () => {
    setIsOpen(false);
  };

  const ClickDeleteFollow = () => {
    setIsOpen(true);
  };

  //if for the avatar image
  const srcImg = React.useMemo(() => {
    if (otherUser.img_url == "" && otherUser.sex == "male") {
      return "/images/man.png";
    } else if (otherUser.img_url == "" && otherUser.sex == "female") {
      return "/images/woman.png";
    } else {
      return otherUser.img_url;
    }
  }, [otherUser]);

  return (
    <div>
      <CheckUserActiveComp />
      <ThemeProvider theme={theme}>
        {(otherUser.name) ?
          <div className='container mt-5'>
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
                  {!isFollow ? "Follow" : "Following "}
                </Button>
              </div>
            </div>

          </div>
          :
          <div style={{ display: "flex", alignItems: "center", minHeight: '300px' }}>
            <div style={{ margin: "0 auto" }}>
              <CircularProgress size={"80px"} />
            </div>
          </div>
        }

        <UserPostsList />

        {isOpen &&
          <Dialog
            open={isOpen}
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
        }
      </ThemeProvider>
    </div>
  )
}
