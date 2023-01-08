import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function FollowerItem({ item }) {
    return (
        <div>
            <div className='d-flex my-3 '>
                <Avatar
                    sx={{ ms: 2, width: 32, height: 32 }}
                    src={item.img_url}
                    alt="follower"
                />
                <Link className='ms-2 dark underLine'>{item.name}</Link>

                <div className='d-flex float-end justify-content-end '><div>Follower</div></div>

            </div>

            <hr className='col' />
        </div>
    )
}
