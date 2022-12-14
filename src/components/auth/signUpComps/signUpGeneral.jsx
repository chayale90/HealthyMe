import React, { useRef, useState } from 'react'
import { API_URL, doApiMethod, doApiMethodSignUp } from '../../../services/apiService';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { labelBtnUpload } from '../../../services/btnStyle';
import { FormControl, FormControlLabel, FormLabel, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField } from '@mui/material';
import { doApiFileUploadAvatars } from '../../../services/fileUploadFun';

export default function SignUpGeneral() {


    const nav = useNavigate()
    let { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const [value, setValue] = useState("female");
    const fileRef = useRef();
    const [fileChosen, setfileChosen] = useState("No Img chosen");

    const onSubmit = (bodyData) => {
        delete bodyData.password2
        console.log(bodyData);
        doApiForm(bodyData)
    }
    const handleChange = (e) => {
        setValue(e.target.value)
    };

    const doApiForm = async (bodyData) => {
        let url = API_URL + "/users"
        try {
            let resp = await doApiMethod(url, "POST", bodyData);
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
            console.log(err.response);
            toast.error("User or password worng, or service down");
        }
    }


    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)} className='col-12 col-md-4 p-3 shadow '>

                <div className='mb-3'>
                    <TextField
                        {...register('name', { required: true, minLength: 2, maxLength: 99 })}
                        autoComplete="FullName"
                        size='small' fullWidth
                        type="text"
                        label="Full Name*"
                        variant="outlined"
                    />
                    {errors.name && <div className='text-danger s12'>Enter valid name </div>}
                </div>

                <div className='mb-3'>
                    <TextField
                        {...register('email', { required: true, pattern: regEmail, maxLength: 99 })}
                        autoComplete="emailAdress"
                        size='small' fullWidth
                        type="email"
                        label="Email*"
                        variant="outlined"
                    />
                    {errors.email && <div className='text-danger s12'>Enter valid email</div>}
                </div>

                <div className='mb-3'>
                    <TextField
                        {...register('password', { required: true, minLength: 3, maxLength: 99 })}
                        autoComplete="password"
                        id="outlined-adornment-password"
                        size='small' fullWidth
                        // sx={{ marginBottom: "20px" }}
                        type="password" label="Password*"
                        variant="outlined" />
                    {errors.password && <div className='text-danger s12'>Enter valid password </div>}
                </div>

                <div className='mb-3'>
                    <TextField
                        {...register('password2', { required: true, validate: (value) => { return value == getValues('password') } })}
                        autoComplete="password2"
                        size='small' fullWidth
                        type="password"
                        label="Confirm Password*"
                        variant="outlined" />
                    {errors.password2 && <div className='text-danger s12'>Password not match</div>}
                </div>


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





                <button type='submit' className='mt-2 btn btn-primary'>Submit</button>

            </form>

        </div>
    )
}
