import React, { useState } from 'react'
import {  Dialog, IconButton, Paper } from '@mui/material'
import {  useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import EditAccount from './editAccount';
import EditProfile from './editProfile';
import EditInfo from './editInfo';
import CheckUserActiveComp from '../../../auth/checkComps/checkUserActiveComp';
import "./editMyDetails.css"

export default function EditMyDetails() {
    const nav = useNavigate()
    const [isOpen, setIsOpen] = useState(Boolean);
    const [values, setValues] = useState({ displayDetails: 'block', displayAccount: 'none', displayProfile: 'none', displayInfo: 'none' });

    //dialog
    const handleClose = () => {
        nav("/myProfile")
    };

    const returnToMyDetails = () => {
        setValues({ displayDetails: 'block', displayAccount: 'none', displayProfile: 'none', displayInfo: 'none' })
    }

    return (
        <div>
            <CheckUserActiveComp />
            {isOpen &&
                <Dialog
                    open={isOpen}
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

                            <div className='divProfile'
                                onClick={() => { setValues({ displayDetails: 'none', displayAccount: 'none', displayProfile: 'none', displayInfo: 'block' }) }}
                            >
                                Personal info
                            </div>

                            <hr className='m-0 pb-5' />

                        </div>
                    </Paper>
                </Dialog>
            }

            <EditAccount displayAccount={values.displayAccount} returnToMyDetails={returnToMyDetails} />
            <EditProfile displayProfile={values.displayProfile} returnToMyDetails={returnToMyDetails} />
            <EditInfo displayInfo={values.displayInfo} returnToMyDetails={returnToMyDetails} />
        </div>
    )
}
