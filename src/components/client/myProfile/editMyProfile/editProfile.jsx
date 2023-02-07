import React, { useState } from 'react'
import { Avatar, Dialog, IconButton, InputBase, Paper } from '@mui/material'
import { OutlinedInput, InputLabel, InputAdornment, Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../../services/theme"
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { btnStyle, btnStyle3, btnStyle2 } from '../../../../services/btnStyle';
import { API_URL, doApiMethod } from '../../../../services/apiService';
import "./editMyDetails"
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function EditProfile({ displayProfile, returnToMyDetails }) {
    const nav = useNavigate()
    const { user } = useSelector(myStore => myStore.userSlice);

    const [open, setOpen] = useState(true);
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values, showPassword: !values.showPassword,
        });
    };
    const handleClickShowNewPassword = () => {
        setValues({
            ...values, showNewPassword: !values.showNewPassword,
        });
    };
    const handleClickShowPassword3 = () => {
        setValues({
            ...values, showPassword3: !values.showPassword3,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


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
                toast.success("Password changed successfully!");
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



                                <Button type='submit'
                                    sx={btnStyle}
                                    className='loginBtn mt-2'
                                >
                                    Save
                                </Button>

                            </div>
                        </form>
                    </Paper>
                </Dialog>
            </ThemeProvider>
        </>
    )
}
