import { Avatar, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setOpenUsersLikes } from "../../../../../features/dialogSlice"
import { btnStyle, btnStyle2, btnStyle3 } from '../../../../../services/btnStyle';


export default function UserLikeItem({ item }) {
    const dispatch = useDispatch();
    const { user } = useSelector(myStore => myStore.userSlice);

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
                        alt="followerImg"
                    />
                    <Link
                        onClick={() => { dispatch(setOpenUsersLikes({ val: false })) }}
                        to={(user._id == item._id) ? "/myProfile" : "/userProfile/" + item._id} className='ms-2 dark underLine mt-1'>
                        {item.name}
                    </Link>
                </div>

                <div className='ml-auto float-end justify-content-end mt-1'>
                    <div className='px-2' style={btnStyle2}>
                        {
                            user.followings.includes(item._id) ? "following" : "follow"
                        }
                    </div>
                </div>
            </div>
            <hr className='col' />
        </div>

    )
}
