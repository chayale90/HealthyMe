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
import "./editMyDetails"


export default function EditProfile({ displayProfile, returnToMyDetails }) {
    const fileRef = useRef();
    const inputRef = useRef(null);

    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate()
    const { user } = useSelector(myStore => myStore.userSlice);

    const [image, setImage] = useState(null);
    const [displayDiv, setDisplayDiv] = useState("block");


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
                // doApiInfoUser()
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


    const handleChange = (e) => {
        console.log(fileRef.current.files[0].name);
        setfileChosen(fileRef.current.files[0].name)
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
        setDisplayDiv("none")

    }

    const removeIMG = () => {
        setImage(null);
        fileRef.current.value = null;
        setDisplayDiv("block")
        setfileChosen("No Img Edit")
    }

    const handleFileInputClick = () => {
        setfileChosen(fileRef.current.files[0].name)
        const file = e.target.files[0];
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Dialog
                    style={{ display: displayProfile }}
                    open={true}
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
                                                sx={{ marginRight: "120px" }}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>
                                            <h2 className='s24 mt-2 '>Profile</h2>
                                        </div>

                                        <div className='text-center mb-5'>
                                            <input
                                                // {...register('img_url', { required: true })}
                                                type="file" id="actual-btn"
                                                ref={fileRef}
                                                hidden
                                                onInput={handleChange}
                                            />
                                            <label style={{ position: "absolute",top:190,left:115, cursor: 'pointer', background: "#FAFAFA", "&:hover": { background: "#FAFAFA" } }} htmlFor="actual-btn"><EditIcon sx={{ color: "#A435F0" }} /></label>

                                            <div className='text-center mx-auto'>
                                                <Avatar
                                                    sx={{  width: 120, height: 120, position: "relative" }}
                                                    src={!image ? user.img_url : image}
                                                    alt="AvatarOfFood"
                                                />
                                            </div>

                                            {/* <Badge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                badgeContent={
                                                    <IconButton
                                                        sx={{ background: "#FAFAFA", "&:hover": { background: "#FAFAFA" } }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>}
                                            >
                                            </Badge> */}


                                        </div>

                                        {/* file */}
                                        {/* <div className='text-center mt-5'> */}

                                        {/* {image &&
                                                <div
                                                    style={{ position: 'relative', zIndex: 99, display: 'flex', justifyContent: 'end' }}>
                                                    <IconButton className='xButton'
                                                        style={{ position: 'absolute', right: 0, top: 0 }}
                                                        onClick={removeIMG}
                                                    >
                                                        <CloseIcon sx={{ color: "#A435F0" }} />
                                                    </IconButton>
                                                </div>
                                            }

                                            <img className='addPhotoDiv' src={!image ? user.img_url : image} alt="Uploaded" style={{ position: 'relative', zIndex: 0 }} />
                                            {image && <span id="file-chosen">{fileChosen}</span>}

                                            <div style={{ display: displayDiv }}>
                                                <input
                                                    // {...register('img_url', { required: true })}
                                                    type="file" id="actual-btn"
                                                    ref={fileRef}
                                                    hidden
                                                    onInput={handleChange}
                                                />
                                                <label style={{ cursor: 'pointer' }} className='mb-1 editPhotoDiv' htmlFor="actual-btn"><EditIcon sx={{ color: "#A435F0" }} />Edit photo</label>
                                            </div>

                                        </div> */}




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
