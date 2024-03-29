import React, { useRef, useState } from 'react'
import { Dialog, IconButton, InputAdornment, OutlinedInput, Paper } from '@mui/material'
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../../services/theme"
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { btnStyle } from '../../../../services/btnStyle';
import { API_URL, doApiMethod } from '../../../../services/apiService';


export default function EditInfo({ displayInfo, returnToMyDetails }) {
    const fileRef = useRef();
    const inputRef = useRef(null);

    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate()
    const { user } = useSelector(myStore => myStore.userSlice);


    const [values, setValues] = useState({ birth_date: user?.birth_date?.slice(0, 10) || '', location: '', height: '' });
    const [displayProgress, setDisplayProgress] = useState("none");

    // const st = String(user?.birth_date)
    // const birth_date = (st).slice(0, 10)
    // console.log(birth_date)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClose = () => {
        nav("/myProfile")
    }

    const onSubmit = async (_dataBody) => {
        // console.log(_dataBody);
        await doApiEditInfo(_dataBody);
    };

    const doApiEditInfo = async (_dataBody) => {
        setDisplayProgress("flex")
        let url = API_URL + "/users/" + user._id;
        try {
            let resp = await doApiMethod(url, "PUT", _dataBody);
            if (resp.data) {
                // console.log(resp.data);
                toast.success("Your profile changed successfully!");
                nav("/myProfile");
            }
            else {
                toast.error("There problem, try again later")
                setDisplayProgress("none")
            }
        }
        catch (err) {
            console.log(err);
            toast.error("There problem, try again later")
            setDisplayProgress("none")
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
                                            <h2 className='s24 mt-2 ms-0 ps-4 ps-md-5 ms-md-4 '>Personal info</h2>
                                        </div>


                                        <div className='d-flex mt-5 mb-4'>
                                            <div className='w-50'>
                                                <OutlinedInput
                                                    {...register('birth_date', { required: true })}
                                                    className='col-11 pe-1'
                                                    size='small'
                                                    label=""
                                                    variant="outlined"
                                                    type={"date"}
                                                    value={values.birth_date} // Add this line
                                                    // defaultValue={user?.birth_date?.slice(0, 10)}
                                                    onChange={handleChange('birth_date')}
                                                />
                                                {errors.birth_date && <div className='text-danger s12'>Enter valid Birth Date</div>}
                                            </div>

                                            <div className='w-50'>
                                                <TextField
                                                    {...register('location', { required: false, minLength: 3, maxLength: 99 })}
                                                    className=' form-control'
                                                    size='small'
                                                    label="Location"
                                                    variant="outlined"
                                                    defaultValue={user.location}
                                                    onChange={handleChange('location')}

                                                />
                                                {errors.location && <div className='text-danger s12'>Enter valid location</div>}
                                            </div>
                                        </div>


                                        <div className='d-flex mb-4'>
                                            <div className='w-50'>
                                                <TextField className='col-auto' type={"number"}
                                                    {...register('height', { required: true, pattern: '[0-9]*', min: 100, max: 300, minLength: 2, maxLength: 3 })}
                                                    size='small'
                                                    label="Height"
                                                    variant="outlined"
                                                    defaultValue={user.height}
                                                    onChange={handleChange('height')}

                                                />
                                                {errors.height && <div className='text-danger s12'>Enter valid height</div>}
                                            </div>
                                        </div>

                                        <Button type='submit'
                                            sx={btnStyle}
                                            className='loginBtn mt-3'
                                            endIcon={<CircularProgress
                                                sx={{ display: displayProgress }}
                                                size={"20px"} color="success"
                                            />}
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
