import { Avatar, Button, IconButton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SettingsIcon from '@mui/icons-material/Settings';
import { IconBase } from 'react-icons';
import { Link } from 'react-router-dom';


export default function MyProfile() {
  const { user } = useSelector(myStore => myStore.userSlice);
  const [values, setValues] = useState({ button1: 'block', button2: 'none' });

  console.log(user);

  return (
<>
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
              <div className='me-3 '><Link className='underLine'> {"4"} <span className='weight500'>Post</span></Link> </div>
              <div className='me-3 '><Link className='underLine'> {user?.followings?.length} <span className='weight500'>Followings</span></Link></div>
              <div><Link className='underLine'>{user?.followers?.length} <span className='weight500'>Followers</span></Link></div>
            </div>

            <div>{user?.info}</div>
          </div>
          <div className='col text-end'> <IconButton sx={{ border: "gray 1px solid" }}><SettingsIcon /></IconButton></div>
        </div>
  
      </div >

        <div className='row '>
          <div className='col-6'>
            <div style={{ position: 'absolute', display: values.button1, minHeight: '2px', background: "#A435F0", width: "45%" }} ></div>
            <Link
              // onClick={handleCloseNavMenu}
              onClick={() => {
                setValues({
                  button1: "block",
                  button2: "none",
                });
              }}
              style={{ display: 'flex', justifyContent: "center",  paddingTop: "21px" }}>
              Home
            </Link>
          </div>

          <div className='col-6 justify-content-center'>
            <div className="" style={{ position: 'absolute', display: values.button2, minHeight: '2px', background: "#A435F0", width: "45%" }} ></div>
            <Link
              // onClick={handleCloseNavMenu}
              onClick={() => {
                setValues({
                  button2: "block",
                  button1: "none",
                });
              }}
              style={{ display: 'flex', justifyContent: "center",  paddingTop: "21px" }}>
              Favorites
            </Link>
          </div>
        </div>
        </div>

      </>
   
  )
}
