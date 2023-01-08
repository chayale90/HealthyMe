import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function FollowingItem({ item }) {
    return (
        <div>

            <div className='d-flex w-100 justify-content-between'>
                <div className='d-flex'>
                    <Avatar
                        sx={{ ms: 2, width: 32, height: 32 }}
                        src={item.img_url}
                        alt="followerImg"
                    />
                    <Link className='ms-2 dark underLine'>{item.name}</Link>
                </div>

                <div className='ml-auto float-end justify-content-end'>Following</div>
            </div>

            <hr className='col' />
        </div>

    )
}
