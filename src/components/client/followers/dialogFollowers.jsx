import { Dialog, IconButton, InputBase, Paper } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import FollowersList from './followersList';
import SearchIcon from '@mui/icons-material/Search';
import { setOpenFollowers } from "../../../features/dialogSlice"


export default function DialogFollowers() {
    const { openFollowers } = useSelector(myStore => myStore.dialogSlice);
    const { user } = useSelector(myStore => myStore.userSlice);
    const dispatch = useDispatch();
    const paperRef = useRef();
    const inputRef = useRef();
    const [search, setSearch] = useState("")

    console.log(search);

    const handleCloseFollowers = () => {
        dispatch(setOpenFollowers({ val: false }))
    };

    const handleFocus = () => {
        paperRef.current.style.borderColor = '#A435F0';
    };
    const handleBlur = () => {
        paperRef.current.style.borderColor = '#DCDCDC';
    };

    const handleSubmit = () => {
        setSearch(inputRef.current.value)
    };

    const handleKeyDown = (e) => {
        if (e.key == "Enter") {
            setSearch(inputRef.current.value)
        }
    };

    return (
        <div>
            <Dialog
                open={openFollowers}
                onClose={handleCloseFollowers}
                aria-labelledby="followers-dialog"
                aria-describedby="followers-dialog-description"
            >
                <Paper
                    style={{ minHeight: '75vh' }}
                    elevation={0}>
                    <div className='container p-md-5 p-4 pb-0 pb-md-0'>
                        <h2 className='s24 weight500 mb-4'>Followers</h2>
                        <IconButton
                            style={{ position: 'absolute', right: 2, top: 2 }}
                            onClick={handleCloseFollowers}
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
                                onKeyDown={handleKeyDown}
                                sx={{ ml: 0, flex: 1, width: "400px" }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'Search my food' }}
                            />
                        </Paper>

                        <div className='mt-5'>
                            <FollowersList usersSearch={search} />
                        </div>


                    </div>
                </Paper>
            </Dialog>
        </div>
    )
}
