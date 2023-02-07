import React, { useEffect, useState } from 'react'
import { Avatar, Dialog, IconButton, InputBase, Paper } from '@mui/material'
import { OutlinedInput, InputLabel, InputAdornment, Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { theme } from "../../../../services/theme"
import { btnStyle, btnStyle3, btnStyle2 } from '../../../../services/btnStyle';
import { API_URL, doApiMethod } from '../../../../services/apiService';
import MyInfo from "../../../../services/myInfo"
import "./editMyDetails"



export default function EditProfile({ displayProfile, returnToMyDetails }) {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate()
    const { user } = useSelector(myStore => myStore.userSlice);

   //hook that get info of user 
   const [doApiInfoUser] = MyInfo();

    const [open, setOpen] = useState(true);


    const onSubmit = async (_dataBody) => {
        console.log(_dataBody);
        await doApiEditAccount(_dataBody);
    };

    const doApiEditAccount = async (_dataBody) => {
        let url = API_URL + "/users/" + user._id;
        try {
            let resp = await doApiMethod(url, "PUT", _dataBody);
            if (resp.data) {
                // console.log(resp.data);
                toast.success("Profile changed successfully!");
                doApiInfoUser()
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
                    style={{ display: displayProfile }}
                    open={open}
                    fullWidth
                    maxWidth="xs"
                    aria-labelledby="editAccount-dialog"
                    aria-describedby="editAccount-dialog-description"
                >
                    <Paper >
                        {
                            user.name ?
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='container p-md-4 p-3'>
                                        <div className='d-flex mb-4 pb-1 '>
                                            <IconButton
                                                onClick={() => { returnToMyDetails() }}
                                                sx={{ marginRight: "120px" }}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>
                                            <h2 className='s24 mt-2 '>Profile</h2>
                                        </div>

                                        <div className='text-center mb-5'>
                                            <Badge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                badgeContent={
                                                    <IconButton
                                                        onClick={() => { "" }}
                                                        sx={{ background: "#FAFAFA", "&:hover": { background: "#FAFAFA" } }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>}
                                            >
                                                <Avatar
                                                    sx={{ float: "start", width: 120, height: 120 }}
                                                    src={user.img_url}
                                                    alt="AvatarOfFood"
                                                />
                                            </Badge>
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
