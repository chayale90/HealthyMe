import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, IconButton, InputAdornment, OutlinedInput, Paper, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../../services/theme"
import { CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { setOpenEditWeight } from "../../../../features/dialogSlice"
import { setFlag } from "../../../../features/userSlice"
import { useForm } from 'react-hook-form';
import { btnStyle } from "../../../../services/btnStyle"
import { API_URL, doApiMethod } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function EditWeight() {
    const { openEditWeight } = useSelector(myStore => myStore.dialogSlice);
    const { user } = useSelector(myStore => myStore.userSlice);
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const paperRef = useRef();
    const inputRef = useRef();
    const nav = useNavigate();

    const handleCloseEditWeight = () => {
        dispatch(setOpenEditWeight({ val: false }))
    };

    const [myWeight, setMyWeight] = useState("");
    const [displayProgress, setDisplayProgress] = useState("none");

    const onSubmit = async (_dataBody) => {
        console.log(_dataBody);
        await doApiEditWeight(_dataBody);
    };

    const doApiEditWeight = async (_dataBody) => {
        setDisplayProgress("flex")
        let url = API_URL + "/users/editWeight/" + user._id;
        try {
            let resp = await doApiMethod(url, "PATCH", _dataBody);
            if (resp.data) {
                console.log(resp.data);
                dispatch(setFlag())
                console.log(myWeight)
                if (myWeight < (user.weight[user.weight.length - 1].myWeight)) {
                    toast.success("Well done! keep doing what you are doing")
                }
                else {
                    toast.success("Your weight updated successfully!");
                }
                setDisplayProgress("none")
                handleCloseEditWeight();
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
        <div>
            <ThemeProvider theme={theme}>
                <Dialog
                    open={openEditWeight}
                    onClose={handleCloseEditWeight}
                    aria-labelledby="followers-dialog"
                    aria-describedby="followers-dialog-description"
                >
                    <Paper>
                        {
                            user.name ?
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='container p-5'>

                                        <h2 className='s24 weight500 mb-4 pb-3 text-center'>Update my weight</h2>
                                        <IconButton
                                            style={{ position: 'absolute', right: 2, top: 2 }}
                                            onClick={handleCloseEditWeight}
                                        >
                                            <CloseIcon />
                                        </IconButton>


                                        <div className='d-flex mb-4 justify-content-center mt-4'>
                                            <OutlinedInput
                                                size='small'
                                                {...register('myWeight', { required: true, pattern: '[0-9]*', min: 25, max: 300, minLength: 2, maxLength: 3 })}
                                                className='col-11' type={"number"}
                                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                                defaultValue={user?.weight[user?.weight.length - 1].myWeight}
                                                onChange={(e) => { setMyWeight(e.target.value) }}
                                            />
                                            {errors.weight && <div className='text-danger s12'>Enter valid weight</div>}
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
        </div>
    )
}
