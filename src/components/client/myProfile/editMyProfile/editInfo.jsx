import React, { useRef, useState } from 'react'
import { Avatar, Dialog, IconButton, InputBase, Paper } from '@mui/material'
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { theme } from "../../../../services/theme"
import { btnStyle, btnStyle3, btnStyle2 } from '../../../../services/btnStyle';
import { API_URL, doApiMethod } from '../../../../services/apiService';
import CloseIcon from '@mui/icons-material/Close';

import "./editMyDetails"
import { doApiFileUploadAvatars } from '../../../../services/fileUploadFun';


export default function EditInfo({ displayInfo, returnToMyDetails }) {
    const fileRef = useRef();
    const inputRef = useRef(null);

    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate()
    const { user } = useSelector(myStore => myStore.userSlice);

    const [displayDiv, setDisplayDiv] = useState("block");


    const handleClose = () => {
        nav("/myProfile")
    }

    const onSubmit = async (_dataBody) => {
        // console.log(_dataBody);
        await doApiEditProfile(_dataBody);
    };

    const doApiEditProfile = async (_dataBody) => {
        let url = API_URL + "/users/" + user._id;
        try {
            let resp = await doApiMethod(url, "PUT", _dataBody);
            if (resp.data) {
                // console.log(resp.data);
                await doApiFileUploadAvatars(resp.data._id, fileRef);
                toast.success("Your profile changed successfully!");
                nav("/myProfile");
            }
            else {
                toast.error("There problem, try again later")
            }
        }
        catch (err) {
            console.log(err);
            toast.error("There problem, try again later")
        }
    };



    return (
        <>
            <ThemeProvider theme={theme}>
                <Dialog
                    style={{ display: displayInfo }}
                    open={true}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="xs"
                    aria-labelledby="editAccount-dialog"
                    aria-describedby="editAccount-dialog-description"
                >
                    <Paper>
                        {
                            user.name ?
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='container p-md-4 p-3'>
                                        <div className='d-flex mb-4 pb-1 '>
                                            <IconButton
                                                onClick={() => { returnToMyDetails() }}
                                              
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>
                                            <h2 className='s24 mt-2 ms-0 ps-4 ps-md-5 ms-md-5 '>Personal info</h2>
                                        </div>



                                        <div className='mb-4'>
                                            <TextField
                                                {...register('name', { required: true, min: 2, max: 99 })}
                                                type={"text"}
                                                size='small'
                                                defaultValue={user.name}
                                                fullWidth
                                                variant="outlined"
                                                label={"name"}
                                                className="form-control"
                                            // onChange={handleChange('name')}
                                            />
                                            {errors.name && <div className='text-danger s12'>Enter valid name</div>}
                                        </div>

                                        <div className='mb-4'>
                                            <TextField type={"text"}
                                                {...register('info', { required: true, min: 2, max: 99 })}
                                                size='small'
                                                defaultValue={user.info}
                                                fullWidth
                                                variant="outlined"
                                                label="My motto"
                                            // onChange={handleChange('info')}
                                            />
                                            {errors.info && <div className='text-danger s12'>Enter valid Motto</div>}
                                        </div>

                                        <Button type='submit'
                                            sx={btnStyle}
                                            className='loginBtn mt-2'
                                        >
                                            Save
                                        </Button>

                                    </div>
                                </form>
                                :
                                <div>Loading...</div>
                        }

                    </Paper>
                </Dialog>
            </ThemeProvider>
        </>
    )
}
