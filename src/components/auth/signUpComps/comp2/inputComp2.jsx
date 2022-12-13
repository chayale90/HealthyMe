import { Button, FormControl, FormControlLabel, Icon, Input, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField, ThemeProvider } from '@mui/material'
import React, { useRef, useState } from 'react'
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
    const [sex, setSex] = useState({female:"female",male:"male"});


    const onSubmit = (bodyFormData) => {
        console.log(bodyFormData)
        setForm({ ...form, ...bodyFormData ,info:"hi myu uhiu uihuk",nickname:"chayush",sex:"male"})
        if (bodyFormData) {
            doApiSignUp()
        }
        //here need to send to grandFather by redux

        // nav('/')
    }

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
    }


    return (
        <div>
            <div >
                <ThemeProvider theme={theme}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className="mb-2 s14"> What is your gender?*</p>
                        <RadioGroup 
                            // {...register('sex')}
                            onChange={(e) => {
                               (e.target.value)
                            }}

                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            size="small"
                        >
                            <div className='d-flex' >
                                <FormControlLabel  value={sex.female} control={<Radio />} label="Female" />
                                <FormControlLabel value={sex.male} control={<Radio/>} label="Male" />
                            </div>
                        </RadioGroup>
                        {/* {errors.sex && <div className='text-danger s12'>Enter valid sex </div>} */}


                        <div className='d-flex mt-3 mb-3'>
                            <div>
                                <OutlinedInput 
                                    {...register('birth_date', { required: true, minLength: 2 })}
                                    className='col-11' size='small' type="date" variant="outlined" />
                                {errors.birth_date && <div className='text-danger s12'>Enter valid Birth Date</div>}
                            </div>
                            <div >
                                <TextField  className='col-auto'
                                    {...register('location', { required: true, minLength: 2, maxLength: 99 })}
                                    size='small' id="outlined-basic" label="Location" variant="outlined" />
                                {errors.location && <div className='text-danger s12'>Enter valid location</div>}
                            </div>
                        </div>


                        <div className='d-flex mb-3'>
                            <div>
                                <FormControl size='small' variant="outlined">
                                    <OutlinedInput  className='col-11'
                                        {...register('weight', { required: true, minLength: 2, maxLength: 4 })}
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                    />
                                    {errors.weight && <div className='text-danger s12'>Enter valid weight</div>}
                                </FormControl>
                            </div>
                            <div >
                                <TextField className='col-auto'
                                    {...register('height', { required: true, minLength: 2 })}
                                    size='small' id="outlined-basic" label="Height*" variant="outlined" />
                                {errors.height && <div className='text-danger s12'>Enter valid weight</div>}
                            </div>

                        </div>

                        <div className='mb-4'>
                            <input  ref={fileRef} type="file" id="actual-btn" hidden onInput={() => { setfileChosen(fileRef.current.files[0].name) }} />
                            <label className='me-3 my-1' style={labelBtnUpload} htmlFor="actual-btn" >   <CloudUploadIcon className='me-2' />Profile Image</label>
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
                    </form>
                </ThemeProvider>
            </div>
        </div>
    )
}
