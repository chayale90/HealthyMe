import { Avatar, Button, IconButton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SettingsIcon from '@mui/icons-material/Settings';
import { IconBase } from 'react-icons';
import { Link } from 'react-router-dom';


export default function MyProfile() {
  const { user } = useSelector(myStore => myStore.userSlice);
  const [values, setValues] = useState({ button1: '#CCCCCC', button2: '#A435F0' });

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

        <div className='row mt-5  '>
          <div className='col-6 p-0 '>
            <div className='w-50' style={{ position: 'absolute', background: values.button1, height: '2px'}} ></div>
            <div>
            <Link
              // onClick={handleCloseNavMenu}
              onClick={() => {
                setValues({
                  button1: "#A435F0",
                  button2: "#CCCCCC",
                });
              }}
              style={{color: values.button1, display: 'flex', justifyContent: "center",paddingTop:"21px", textDecoration: "none" }}>
              Posts
            </Link>
            </div>
          </div>

          <div className='col-6 p-0'>
            <div className="w-50" style={{ position: 'absolute', background: values.button2, height: '2px' }} ></div>
            <div>
            <Link
              // onClick={handleCloseNavMenu}
              onClick={() => {
                setValues({
                  button2: "#A435F0",
                  button1: "#CCCCCC",
                });
              }}
              style={{color: values.button2, display: 'flex', justifyContent: "center",paddingTop:"21px",  textDecoration: "none" }}>
              My Personal info
            </Link>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}
