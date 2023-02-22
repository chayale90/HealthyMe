import { Avatar } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {  setOpenFollowings } from "../../../features/dialogSlice"


export default function FollowingItem({ item }) {
    const dispatch = useDispatch();

        //if for the avatar image
        const srcImg = React.useMemo(() => {
            if (item.img_url == "" && item.sex == "male") {
                return "/images/man.png";
            } else if (item.img_url == "" && item.sex == "female") {
                return "/images/woman.png";
            } else {
                return item.img_url;
            }
        }, [item]);

    return (
        <div>

            <div className='d-flex w-100 justify-content-between'>
                <div className='d-flex'>
                    <Avatar
                        sx={{ ms: 2, width: 32, height: 32 }}
                        src={srcImg}
                        alt="followingImg"
                    />
                    <Link
                        onClick={() => { dispatch(setOpenFollowings({ val: false })) }}
                        to={"/userProfile/" + item._id} className='ms-2 dark underLine'>
                        {item.name}
                    </Link>
                </div>

                <div className='ml-auto float-end justify-content-end'>Following</div>
            </div>

            <hr className='col' />
        </div>

    )
}
