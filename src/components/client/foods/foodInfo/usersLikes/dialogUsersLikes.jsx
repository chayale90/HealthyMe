import { Dialog, IconButton, InputBase, Paper } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { setOpenUsersLikes } from "../../../../../features/dialogSlice"
import UsersLikesList from './usersLikesList';


export default function DialogUsersLikes({ foodID }) {
    const { openUsersLikes } = useSelector(myStore => myStore.dialogSlice);
    const { user } = useSelector(myStore => myStore.userSlice);
    const dispatch = useDispatch();
    const paperRef = useRef();
    const inputRef = useRef();
    const [search, setSearch] = useState("")

    // console.log(search);

    const handleCloseUsersLikes = () => {
        dispatch(setOpenUsersLikes({ val: false }))
    };



    return (
        <div>
            <Dialog
                open={openUsersLikes}
                onClose={handleCloseUsersLikes}
                aria-labelledby="followers-dialog"
                aria-describedby="followers-dialog-description"
            >
                <Paper
                 sx={{
                        '@media (max-width: 600px)': {
                            width: '300px'
                        },
                        '@media (min-width: 600px)': {
                            width: '500px'
                        },
                        minHeight: '50vh',
                    
                    }}
                    elevation={0}>
                    <div className='container p-md-5 p-4 pb-0 pb-md-0'>
                        <h2 className='s24 weight500 mb-4'>Likes</h2>
                        <IconButton
                            style={{ position: 'absolute', right: 2, top: 2 }}
                            onClick={handleCloseUsersLikes}
                        >
                            <CloseIcon />
                        </IconButton>

                        <div className='mt-5'>
                            <UsersLikesList foodID={foodID} />
                        </div>
                    </div>
                </Paper>
            </Dialog>
        </div>
    )
}
