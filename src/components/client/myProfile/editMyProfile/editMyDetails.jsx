import React, { useState } from 'react'
import { Avatar, Dialog, IconButton, InputBase, Paper } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import EditAccount from './editAccount';
import "./editMyDetails.css"
import EditProfile from './editProfile';

export default function EditMyDetails() {
    const nav = useNavigate()
    const [open, setOpen] = useState(true);
    const [values, setValues] = useState({ displayDetails: 'block', displayAccount: 'none', displayProfile: 'none', displayInfo: 'none' });

    //dialog
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
       nav("/myProfile")
    };

    const returnToMyDetails = () => {
        setValues({ displayDetails: 'block', displayAccount: 'none', displayProfile: 'none' })
    }

    return (
        <div>
            <Dialog
                open={open}
                style={{ display: values.displayDetails }}
                onClose={handleClose}
                aria-labelledby="followers-dialog"
                aria-describedby="followers-dialog-description"
            >
                <Paper
                    elevation={0}>
                    <div className='container p-md-5 p-4 pb-0 pb-md-0 '>
                        <h2 className='s24 weight500 mb-4 pb-3'>Settings</h2>
                        <IconButton
                            style={{ position: 'absolute', right: 2, top: 2 }}
                            onClick={() => { nav("/myProfile") }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <hr className='m-0' />
                        <div className='divProfile'
                            onClick={() => { setValues({ displayDetails: 'none', displayAccount: 'block', displayProfile: 'none', displayInfo: 'none' }) }}
                        >
                            Account
                        </div>

                        <hr className='m-0' />

                        <div className='divProfile'
                            onClick={() => { setValues({ displayDetails: 'none', displayAccount: 'none', displayProfile: 'block', displayInfo: 'none' }) }}

                        >
                            Profile
                        </div>

                        <hr className='m-0' />
                        <div className=' divProfile'

                        >Personal info</div>
                        <hr className='m-0 pb-5' />

                    </div>


                </Paper>
            </Dialog>

            <EditAccount displayAccount={values.displayAccount} returnToMyDetails={returnToMyDetails} />
            <EditProfile displayProfile={values.displayProfile} returnToMyDetails={returnToMyDetails} />
        </div>
    )
}
