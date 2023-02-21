import { IconButton } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import "./myProfilePage.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector } from 'react-redux';

export default function PostItem({ item }) {
    const { user } = useSelector(myStore => myStore.userSlice);
    const [isHovered, setIsHovered] = useState(false);
    const nav = useNavigate()

    return (
        <div className='p-0 col-4 imgPost'>
            <div
                className={isHovered ? 'lightDiv overflow-hidden h-100' : 'overflow-hidden h-100'}
                style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    className='w-100 imgFood'
                    style={{ borderRadius: "9px" }}
                    onClick={() => { user._id == item.user_id ? nav("/myFoodInfo/" + item._id) : nav("/foodInfo/" + item._id) }}
                    src={item.img_url}
                    alt="imgFood"
                />

                {isHovered &&
                    <IconButton
                        className="eyeBTN"
                        onClick={() => { user._id == item.user_id ? nav("/myFoodInfo/" + item._id) : nav("/foodInfo/" + item._id) }}
                        style={{ position: 'absolute', padding: 0 }}>
                        <VisibilityIcon className="eyeBTN" sx={{ fontSize: "40px" }} />
                    </IconButton>
                }


            </div>
        </div>

    )
}
