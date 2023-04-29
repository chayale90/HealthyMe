import React, { useEffect, useRef, useState } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField, ThemeProvider } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { theme } from '../../../../services/theme'
import { btnStyle, btnStyle2, labelBtnUpload } from '../../../../services/btnStyle';
import { API_URL, doApiMethod } from '../../../../services/apiService';
import { doApiFileUploadAvatars } from '../../../../services/fileUploadFun';
import { setIsShowBeginComp, setIsShowEndComp, addForm2, resetForm, changeLoading, resetFormBegin } from "../../../../features/signUpSlice"


export default function InputsEnd() {
    const dispatch = useDispatch();
    const { form, loading } = useSelector(myStore => myStore.signUpSlice)
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();
    const fileRef = useRef();
    const [fileChosen, setfileChosen] = useState("No Img chosen");
    const [value, setValue] = useState("female");
    const [weight, setWeight] = useState([]);
    const [displayProgress, setDisplayProgress] = useState("none");

    useEffect(() => {
        if (loading == "waiting")
            doApiSignUp();
    }, [loading]);

    const onSubmit = async (_bodyFormData) => {
        // console.log(_bodyFormData);
        _bodyFormData.weight = weight;
        dispatch(addForm2({ val: _bodyFormData }))
    };

    const doApiSignUp = async () => {
        setDisplayProgress("flex")
        let url = API_URL + "/users";
        try {
            let resp = await doApiMethod(url, "POST", form);
            if (resp.data._id) {
                // console.log(resp.data);
                await doApiFileUploadAvatars(resp.data._id, fileRef);
                toast.success("You signed up successfully!");
                nav("/");
                dispatch(setIsShowBeginComp());
                dispatch(setIsShowEndComp());
                dispatch(resetForm())
                dispatch(resetFormBegin())
                dispatch(changeLoading({ val: null }))
                setDisplayProgress("none")
            }
            else {
                toast.error(err.response.data[0])
                setDisplayProgress("none")
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                toast.error("Email already in system, try log in")
            }
            toast.error(err.response.data.msg)
            setDisplayProgress("none")
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ThemeProvider theme={theme}>

                    <div>
                        <FormControl  >
                            <Grid container direction="row" alignItems="center">
                                {/* <p className="mb-2 s14"> What is your gender?*</p> */}
                                <FormLabel style={{ marginRight: 20 }} className="s14 " id="demo-row-radio-buttons-group-label">What is your gender?*</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                    }}
                                >
                                    <Box sx={{ display: "flex" }}>
                                        <FormControlLabel control={<Radio size="small" />} {...register('sex', { require: true })} value="female" label="Female" />
                                        <FormControlLabel control={<Radio size="small" />} {...register('sex', { require: true })} value="male" label="Male" />
                                    </Box>

                                </RadioGroup>
                            </Grid>
                        </FormControl>
                        {/* {errors.sex && <div className='text-danger s12'>Enter valid sex </div>} */}
                    </div>


                    <div className='d-flex mt-3 mb-3'>
                        <div className='w-50'>
                            <OutlinedInput
                                {...register('birth_date', { required: true, minLength: 2 })}
                                className='col-11 pe-1'
                                size='small'
                                label=""
                                variant="outlined"
                                type={"date"}
                            />
                            {errors.birth_date && <div className='text-danger s12'>Enter valid Birth Date</div>}
                        </div>

                        <div className='w-50'>
                            <TextField
                                {...register('location', { required: false, minLength: 3, maxLength: 99 })}
                                className='col-auto'
                                size='small' id="outlined-basic"
                                label="Location"
                                variant="outlined"
                            />
                            {errors.location && <div className='text-danger s12'>Enter valid location</div>}

                        </div>
                    </div>

                    <div className='d-flex mb-3'>
                        <div className='w-50'>
                            <FormControl size='small' variant="outlined">
                                <OutlinedInput
                                    {...register('weight', { required: true, pattern: '[0-9]*', min: 25, max: 180, minLength: 2, maxLength: 3 })}
                                    className='col-11' type={"number"}
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="end">kg*</InputAdornment>}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setWeight([{ "myWeight": val }]);
                                    }}
                                />
                                {errors.weight && <div className='text-danger s12'>Enter valid weight</div>}
                            </FormControl>
                        </div>

                        <div className='w-50'>
                            <TextField className='col-auto' type={"number"}
                                {...register('height', { required: true, pattern: '[0-9]*', min: 100, max: 300, minLength: 2, maxLength: 3 })}
                                size='small'
                                id="outlined-basic"
                                label="Height*"
                                variant="outlined"
                            />
                            {errors.height && <div className='text-danger s12'>Enter valid height</div>}
                        </div>

                    </div>

                    <div className='mb-4'>
                        <input ref={fileRef} type="file" id="actual-btn" hidden onInput={() => { setfileChosen(fileRef.current.files[0].name) }} />
                        <label className='me-3 my-1' style={labelBtnUpload} htmlFor="actual-btn"><CloudUploadIcon className='me-2' />Profile Image</label>
                        <span id="file-chosen">{fileChosen}</span>
                    </div>

                    <div className='d-flex mt-2'>

                        <Button
                            startIcon={<KeyboardArrowLeftIcon />}
                            onClick={() => {
                                dispatch(setIsShowBeginComp())
                                dispatch(setIsShowEndComp())
                                dispatch(resetForm())
                                dispatch(changeLoading({ val: null }))
                            }}
                            sx={btnStyle2}
                            className='loginBtn me-2'>
                            Back
                        </Button>

                        <Button type='submit'
                            sx={btnStyle}
                            className='loginBtn'
                            endIcon={<CircularProgress sx={{ display: displayProgress }} size={"20px"} color="success" />}
                        >
                            submit
                        </Button>

                    </div>
                </ThemeProvider>
            </form>
        </div>
    )
}
