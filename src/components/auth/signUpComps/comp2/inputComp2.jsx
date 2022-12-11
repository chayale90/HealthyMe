import { Button, FormControl, FormControlLabel, Icon, Input, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField, ThemeProvider } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { theme } from '../../../../services/theme'
import { useNavigate } from 'react-router-dom';
import { btnStyle, btnStyle2, labelBtnUpload } from '../../../../services/btnStyle';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { API_URL, doApiMethod } from '../../../../services/apiService';
import { doApiFileUploadAvatars } from '../../../../services/fileUploadFun';
import { toast } from 'react-toastify';

export default function InputComp2() {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();
    const fileRef = useRef();
    const [fileChoosen, setfileChoosen] = useState("No file chosen");

    // const [values, setValues] = useState({
    //     weight: '',
    //     value: "1998-06-28"
    // });

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };


    const onSubmit = (bodyFormData) => {
        console.log(bodyFormData)
        //here need to send to grandFather by redux
        doApiSignUp(bodyFormData);
        console.log(fileRef.current.files);
        // nav('/')
    }

    const doApiSignUp = async (bodyFormData) => {
        let url = API_URL + "/users";
        try {
            let resp = await doApiMethod(url, "POST", bodyFormData);
            if (resp.data._id) {
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
            toast.error("There problem , try sign up later")
        }
    }


    return (
        <div>

            <div >
                <ThemeProvider theme={theme}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <p className="mb-2 s14"> What is your gender?*</p>
                        <RadioGroup
                            {...register('sex', { required: true, minLength: 2, maxLength: 99 })}

                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            size="small"
                        >
                            <div className='d-flex' >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </div>
                        </RadioGroup>
                        {errors.sex && <div className='text-danger s12'>Enter valid sex </div>}


                        <div className='d-flex mt-3 mb-3'>
                            <div >
                                <OutlinedInput
                                    {...register('birth_date', { required: true, minLength: 2, maxLength: 10 })}
                                    className='me-3' size='small' type="date" variant="outlined" />
                                {errors.birth_date && <div className='text-danger s12'>Enter valid Birth Date</div>}
                            </div>
                            <div >
                                <TextField
                                    {...register('location', { required: true, minLength: 2, maxLength: 99 })}
                                    size='small' id="outlined-basic" label="Location" variant="outlined" />
                                {errors.location && <div className='text-danger s12'>Enter valid location</div>}
                            </div>
                        </div>


                        <div className='d-flex mb-4'>
                            <div>
                                <FormControl size='small' variant="outlined">
                                    <OutlinedInput
                                        {...register('weight', { required: true, minLength: 2, maxLength: 3 })}
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                    />
                                    {errors.weight && <div className='text-danger s12'>Enter valid weight</div>}
                                </FormControl>
                            </div>
                            <div  className='ms-3'>
                                <TextField
                                    {...register('height', { required: true, minLength: 2, maxLength: 3 })}
                                   size='small' id="outlined-basic" label="Height *" variant="outlined" />
                                {errors.height && <div className='text-danger s12'>Enter valid weight</div>}
                            </div>

                        </div>

                        <div className='mb-4'>
                            <CloudUploadIcon />
                            <input ref={fileRef} type="file" id="actual-btn" hidden onInput={()=>{ setfileChoosen(fileRef.current.files[0].name)}} />
                            <label style={labelBtnUpload} htmlFor="actual-btn" >Profile Image</label>
                            {/* name of file chosen  */}
                            <span id="file-chosen">{fileChoosen}</span>
                        </div>

                        <div className='d-flex mt-2'>

                            <Button
                                startIcon={<KeyboardArrowLeftIcon />}
                                onClick={() => nav('/signUp')}
                                sx={btnStyle2}
                                className='loginBtn me-2'>
                                Back
                            </Button>

                            <Button type='submit'
                                // onClick={() => nav('/signUp/comp2')}
                                sx={btnStyle}
                                className='loginBtn'>
                                Finish
                            </Button>

                        </div>
                    </form>
                </ThemeProvider>
            </div>
        </div>
    )
}
