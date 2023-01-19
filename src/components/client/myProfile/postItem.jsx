import { IconButton } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import "./myProfilePage.css"
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function PostItem({ item }) {
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
                <img className='w-100 imgFoodPost'
                    onClick={() => { nav("/FoodInfo/" + item._id) }}
                    src={item.img_url}
                    alt="imgFood"
                />

                {isHovered &&
                    <IconButton
                        className="eyeBTN"
                        onClick={() => { nav("/FoodInfo/" + item._id) }}
                        style={{ position: 'absolute', padding: 0 }}>
                        <VisibilityIcon className="eyeBTN" sx={{ fontSize: "40px" }} />
                    </IconButton>
                }


            </div>
        </div>

    )
}
