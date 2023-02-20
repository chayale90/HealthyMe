import { Avatar } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { setOpenFollowers } from "../../../features/dialogSlice"


export default function FollowerItem({ item }) {
    const dispatch = useDispatch();

    //if for the avatar image
    let srcImg;
    if (item.img_url == "" && item.sex == "male") {
        srcImg = "/images/man.png"
    } else if (item.img_url == "" && item.sex == "female") {
        srcImg = "/images/woman.png"
    } else {
        srcImg = item?.img_url
    }
    return (
        <div>

            <div className='d-flex w-100 justify-content-between'>
                <div className='d-flex'>
                    <Avatar
                        sx={{ ms: 2, width: 32, height: 32 }}
                        src={srcImg}
                        alt="followerImg"
                    />
                    <Link
                        onClick={() => { dispatch(setOpenFollowers({ val: false })) }}
                        to={"/userProfile/" + item._id} className='ms-2 dark underLine'>
                        {item.name}
                    </Link>
                </div>

                <div className='ml-auto float-end justify-content-end'>Follower</div>
            </div>


            <hr className='col' />
        </div>

    )
}
