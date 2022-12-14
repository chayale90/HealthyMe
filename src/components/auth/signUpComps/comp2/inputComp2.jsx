import React, { useRef, useState } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField, ThemeProvider } from '@mui/material'
import { useForm } from 'react-hook-form';
import { theme } from '../../../../services/theme'
import { useNavigate } from 'react-router-dom';
import { btnStyle, btnStyle2, labelBtnUpload } from '../../../../services/btnStyle';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { API_URL, doApiMethod, doApiMethodSignUp } from '../../../../services/apiService';
import { doApiFileUploadAvatars } from '../../../../services/fileUploadFun';
import { toast } from 'react-toastify';

export default function InputComp2({ showHideComp1,
    setshowHideComp1,
    showHideComp2,
    setshowHideComp2,
    form,
    setForm }) {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();
    const fileRef = useRef();
    const [fileChosen, setfileChosen] = useState("No Img chosen");
    const [value, setValue] = useState("female");

    console.log({ value });

    const handleChange = (e) => {
        setValue(e.target.value)
    };

    const onSubmit =  (_bodyFormData) => {
        console.log(_bodyFormData)
         setForm({ ...form, ..._bodyFormData })
        if (_bodyFormData) {
            doApiSignUp()
        }
        //here need to send to grandFather by redux
        // nav('/')
    };

    const doApiSignUp = async () => {
        let url = API_URL + "/users";
        try {
            let resp = await doApiMethodSignUp(url, "POST", form);
            if (resp.data._id) {
                console.log(resp.data);
                await doApiFileUploadAvatars(resp.data._id, fileRef)
                toast.success("You signed up succefuly")
                nav("/")
            }
            else {
                toast.error("There problem, try again later")
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.msg)
        }
    };


    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ThemeProvider theme={theme}>

                        <div>
                            <FormControl  >
                                <p className="mb-2 s14"> What is your gender?*</p>
                                <FormLabel id="demo-row-radio-buttons-group-label">What is your gender?*</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={value}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel control={<Radio size="small" />} {...register('sex', { require: true })} value="female" label="Female" />
                                    <FormControlLabel control={<Radio size="small" />} {...register('sex', { require: true })} value="male" label="Male" />

                                </RadioGroup>
                            </FormControl>
                            {/* {errors.sex && <div className='text-danger s12'>Enter valid sex </div>} */}
                        </div>




                        <div className='d-flex mt-3 mb-3'>
                            <div>
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
                            <div>

                                <TextField
                                    {...register('location', { required: false, minLength: 2, maxLength: 99 })}
                                    className='col-auto'
                                    size='small' id="outlined-basic"
                                    label="Location"
                                    variant="outlined"
                                />
                                {errors.location && <div className='text-danger s12'>Enter valid location</div>}

                            </div>
                        </div>


                        <div className='d-flex mb-3'>
                            <div>
                                <FormControl size='small' variant="outlined">
                                    <OutlinedInput
                                        {...register('weight', { required: true, pattern: '[0-9]*', min: 25, minLength: 2, maxLength: 3 })}
                                        className='col-11' type={"number"}
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="end">kg*</InputAdornment>}
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}

                                    />
                                    {errors.weight && <div className='text-danger s12'>Enter valid weight</div>}
                                </FormControl>
                            </div>
                            <div>
                                <TextField className='col-auto' type={"number"}
                                    {...register('height', { required: true, pattern: '[0-9]*', min: 100, minLength: 2, maxLength: 3 })}
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
                                    setshowHideComp1(!showHideComp1)
                                    setshowHideComp2(!showHideComp2)
                                    setForm({})
                                }
                                }
                                sx={btnStyle2}
                                className='loginBtn me-2'>
                                Back
                            </Button>

                            <Button type='submit'
                                sx={btnStyle}
                                className='loginBtn'>
                                Finish
                            </Button>

                        </div>
                    </ThemeProvider>
                </form>

            </div>
        </div>
    )
}
