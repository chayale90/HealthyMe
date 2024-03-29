import React, { useRef, useState } from 'react'
import { Avatar, Dialog, IconButton, Paper } from '@mui/material'
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// project imports
import { theme } from "@/services/theme"
import { btnStyle } from '@/services/btnStyle';
import { API_URL, doApiMethod } from '@/services/apiService';
import { uploadAvatarUpdate } from '@/services/fileUploadFun';
import "./editMyDetails"


export default function EditProfile({ displayProfile, returnToMyDetails }) {
    const fileRef = useRef();
    const inputRef = useRef(null);

    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate()
    const { user } = useSelector(myStore => myStore.userSlice);

    const [image, setImage] = useState(null);
    const [displayDiv, setDisplayDiv] = useState("block");
    const [fileChosen, setfileChosen] = useState("No Img Edit");
    const [displayProgress, setDisplayProgress] = useState("none");

    const handleClose = () => {
        nav("/myProfile")
    }

    const onSubmit = async (_dataBody) => {
        await doApiEditProfile(_dataBody);
    };

    const doApiEditProfile = async (_dataBody) => {
        setDisplayProgress("flex")
        let url = API_URL + "/users/" + user._id;
        try {
            let resp = await doApiMethod(url, "PUT", _dataBody);
            if (resp.data) {
                const uploadSuccess = await uploadAvatarUpdate(resp.data._id, fileRef);
                if (uploadSuccess) {
                    toast.success("Your profile changed successfully!");
                    nav("/myProfile")
                }
                else toast.error("There was a problem uploading the image");
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

    //if for the avatar image
    const srcImg = React.useMemo(() => {
        if (user.img_url == "" && user.sex == "male") {
            return "/images/man.png";
        } else if (user.img_url == "" && user.sex == "female") {
            return "/images/woman.png";
        } else {
            return `${user.img_url}?${Date.now()}`;
        }
    }, [user]);


    return (
        <>
            <ThemeProvider theme={theme}>
                <Dialog
                    style={{ display: displayProfile }}
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
                                        <div className='d-flex mb-4 pb-1 w-75 justify-content-between'>
                                            <IconButton
                                                onClick={() => { returnToMyDetails() }}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>
                                            <h2 className='s24 mt-2 pe-md-5 me-md-3 me-4'>Profile</h2>
                                        </div>

                                        <div className='text-center d-flex justify-content-center mb-5 '>
                                            <input
                                                type="file" id="actual-btn"
                                                ref={fileRef}
                                                hidden
                                                onInput={handleChange}
                                            />
                                            <label style={{ borderRadius: "50%", padding: "5px", position: "absolute", top: 190, left: 240, zIndex: 99, cursor: 'pointer', background: "#FAFAFA", "&:hover": { background: "#FAFAFA" }, boxShadow: "rgba(0, 0, 0, 0.16)" }} htmlFor="actual-btn">
                                                <EditIcon sx={{ color: "#A435F0" }} />
                                            </label>
                                            <Avatar
                                                sx={{ width: 120, height: 120, position: "relative" }}
                                                src={!image ? srcImg : image}
                                                alt="AvatarImg"
                                            />
                                            {image &&
                                                <div
                                                    style={{ position: 'relative', zIndex: 99, display: 'flex', justifyContent: 'end' }}>
                                                    <IconButton className='xButton'
                                                        style={{ position: 'absolute', left: -10, top: -10 }}
                                                        onClick={removeIMG}
                                                    >
                                                        <CloseIcon sx={{ color: "#A435F0" }} />
                                                    </IconButton>
                                                </div>
                                            }
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
                                                {...register('info', { required: false, min: 2, max: 99 })}
                                                size='small'
                                                defaultValue={user.info}
                                                fullWidth
                                                variant="outlined"
                                                label="My motto"
                                            />
                                            {errors.info && <div className='text-danger s12'>Enter valid Motto</div>}
                                        </div>

                                        <Button
                                            type='submit'
                                            sx={btnStyle}
                                            className='loginBtn mt-2'
                                            endIcon={<CircularProgress
                                                sx={{ display: displayProgress }}
                                                size={"20px"}
                                                color="success"
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
