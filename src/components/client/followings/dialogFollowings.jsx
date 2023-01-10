import { Dialog, IconButton, InputBase, Paper } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { setOpenFollowings } from "../../../features/dialogSlice"
import FollowingsList from './followingsList';


export default function DialogFollowings() {
    const { openFollowings } = useSelector(myStore => myStore.dialogSlice);
    const dispatch = useDispatch();

    const handleCloseFollowings = () => {
        dispatch(setOpenFollowings({ val: false }))
    };

    const handleFocus = () => {
        paperRef.current.style.borderColor = '#A435F0';
    };
    const handleBlur = () => {
        paperRef.current.style.borderColor = '#DCDCDC';
    };

    const paperRef = useRef();
    const inputRef = useRef();

    const handleSubmit = () => {
        setSearch(inputRef.current.value)
    };

    return (
        <div>
            <Dialog
                open={openFollowings}
                onClose={handleCloseFollowings}
                aria-labelledby="Followings-dialog"
                aria-describedby="Followings-dialog-description"
            >
                <Paper
                    style={{ minHeight: '50vh' }}
                    elevation={0}>
                    <div className='container p-md-5 p-4 pb-0 pb-md-0'>
                        <h2 className='s24 weight500 mb-4'>Following</h2>
                        <IconButton
                            style={{ position: 'absolute', right: 2, top: 2 }}
                            onClick={handleCloseFollowings}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Paper
                            ref={paperRef}
                            elevation={0}
                            sx={{ border: "1px solid #DCDCDC", p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: 100, boxShadow: "0px 0px 10px -4px rgba(0, 0, 0, 0.16)" }}
                        >
                            <IconButton
                                onClick={handleSubmit}
                                sx={{ p: '10px', color: '#A435F0' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                inputRef={inputRef}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                // onChange={handleChange}
                                // onKeyDown={handleKeyDown}
                                sx={{ ml: 0, flex: 1, width: "400px" }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'Search my Followings' }}
                            />
                        </Paper>

                        <div className='mt-5'><FollowingsList/></div>


                    </div>
                </Paper>
            </Dialog>
        </div>
    )
}
