import { Avatar, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useNavigate } from 'react-router-dom';
import NavBarMyProfile from './navBarMyProfile';


export default function MyProfilePage() {
  const { user } = useSelector(myStore => myStore.userSlice);
  const nav = useNavigate()
  console.log(user);

  return (
    <div>
      <div className='container mb-5 mt-4'>
        <div className='d-flex ms-2'>

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

          <div className='ms-sm-5 ms-3 mt-0 mt-sm-3'>
            <h2 className='mb-4'> {user?.name}</h2>

            <div className='d-flex mb-3 text-center'>
              <div className='me-3 '><Link className='underLine'> {"4"} <span className='weight500'>Post</span></Link> </div>
              <div className='me-3 '><Link className='underLine'> {user?.followings?.length} <span className='weight500'>Followings</span></Link></div>
              <div><Link className='underLine'>{user?.followers?.length} <span className='weight500'>Followers</span></Link></div>
            </div>

            <div>{user?.info}</div>
          </div>


          <div className='col text-end'>
            <Tooltip title={"Edit"} >
              <IconButton onClick={() => { nav("/editMyProfile") }} sx={{ border: "gray 1px solid" }}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <NavBarMyProfile />


    </div>


  )
}
