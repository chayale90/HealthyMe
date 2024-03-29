//3rd library
import React, { useRef, useState } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button, FormControl, IconButton, InputLabel, TextField, ThemeProvider } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import { CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// project imports
import { theme } from '@/services/theme';
import { btnStyle } from '@/services/btnStyle';
import CheckUserActiveComp from '../../../auth/checkComps/checkUserActiveComp';
import { API_URL, doApiMethod } from '@/services/apiService';
import { uploadImgFood } from '@/services/fileUploadFun';
import "./addFood.css"

export default function AddFood() {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();
    const fileRef = useRef();
    const [selectedOption, setSelectedOption] = useState("");
    const [fileNameChosen, setFileNameChosen] = useState("");
    const [image, setImage] = useState(null);
    const [displayDiv, setDisplayDiv] = useState("block");
    const [displayProgress, setDisplayProgress] = useState("none");


    const onSubAddFood = async (bodyFormData) => {
        setDisplayProgress("flex");
        console.log(bodyFormData);
        const url = `${API_URL}/foods`;
        try {
            const resp = await doApiMethod(url, "POST", bodyFormData);
            if (resp.data) {
                const uploadSuccess = await uploadImgFood(resp.data._id, fileRef);
                uploadSuccess
                    ? (toast.success("Your Dish was added successfully! You won 5 coins!"), nav("/foods"))
                    : toast.error("There was a problem uploading the image");
            } else {
                toast.error("There was a problem adding the dish, please try again later");
            }
        } catch (err) {
            console.log(err);
            alert("There was a problem, try again later");
        } finally {
            setDisplayProgress("none");
        }
    };


    const handleFile = (e) => {    
        setFileNameChosen(fileRef.current.files[0].name);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
        setDisplayDiv("none");
     
    }

    const removeIMG = () => {
        setImage(null);
        fileRef.current.value = null;
        setDisplayDiv("block");
        setFileNameChosen("");
    }

    return (
        <div className='container mt-3 mb-4'>
            <CheckUserActiveComp />
            <form onSubmit={handleSubmit(onSubAddFood)}>
                <ThemeProvider theme={theme}>
                    <div className='mx-auto navButtons'>
                        <div>
                            <IconButton
                                onClick={() => {
                                    nav("/foods")
                                }}
                                aria-label="back">
                                <KeyboardArrowLeftIcon />
                            </IconButton>Back
                        </div>

                        <Button
                            type='submit'
                            className='saveBtn'
                            sx={btnStyle}
                            endIcon={<CircularProgress sx={{ display: displayProgress }} size={"20px"} color="success" />}
                        >Add
                        </Button>
                    </div>

                    <div className="mx-auto mainAddFood" >
                        <div className=''>
                            <h2 className='s24 mt-3 '>Dish Name</h2>
                            <TextField
                                {...register('name', { required: { value: true, message: 'Name is requried' }, minLength: { value: 3, message: "First name must be at least 3 characters" }, maxLength: 99 })}
                                id="outlined-basic"
                                fullWidth
                                placeholder="Give your dish a name"
                                size='small'
                                variant="outlined"
                            />
                            {errors.name && <div className='text-danger s14'>{errors?.name?.message}</div>}
                        </div>

                        {/* file */}
                        <div className='text-center mt-5'>
                            <div style={{ display: displayDiv }}>
                                <input
                                    name="food_image"
                                    type="file"
                                    id="fileInput"
                                    ref={fileRef}
                                    onInput={handleFile}
                                    required
                                />
                                <label style={{ cursor: 'pointer' }} className='mb-1 addPhotoDiv' htmlFor="fileInput">
                                    <AddAPhotoIcon sx={{ color: "#A435F0" }} />
                                    Add photo
                                </label>
                            </div>
                            {image &&
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

                            {image && <img className='addPhotoDiv' src={image} alt="Uploaded" style={{ position: 'relative', zIndex: 0 }} />}
                            <span id="file-chosen">{fileNameChosen}</span>
                        </div>


                        <FormControl fullWidth sx={{ mt: 5, mb: 4 }} size="small">
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                {...register('categories_url', { required: true, minLength: 2, maxLength: 99 })}
                                labelId="demo-select-small"
                                id="select-category"
                                value={selectedOption}
                                label="Category"
                                onChange={(e) => setSelectedOption(e.target.value)}
                                name="categories_url"
                                variant="outlined"
                            >
                                <MenuItem value={"salads"}>Salads</MenuItem>
                                <MenuItem value={"shakes"}>Shakes</MenuItem>
                                <MenuItem value={"breakFast"}>Breakfast</MenuItem>
                                <MenuItem value={"mainMeal"}>Main meal</MenuItem>
                                <MenuItem value={"quickMeal"}>Quick meal</MenuItem>
                            </Select>
                            {errors.categories_url && <div className='text-danger s14'>category is requried</div>}
                        </FormControl>

                        <div>
                            <h2 className='s24 mb-2'>Description</h2>
                            <TextField
                                {...register('description', { required: { value: true, message: 'Description is requried' }, minLength: { value: 10, message: "Description must be at least 10 characters" }, maxLength: 500 })}
                                id="outlined-basic" fullWidth
                                placeholder="Descrip your dish.."
                                variant="outlined"
                                size='small'
                            />
                            {errors.description && <div className='text-danger s14'>{errors?.description?.message}</div>}
                        </div>

                        <div>
                            <h2 className='s24 mt-4 mb-2'>Ingredients</h2>
                            <TextField
                                {...register('ingredient', { required: { value: true, message: 'Ingredients is requried' }, minLength: 2, maxLength: 99 })}
                                id="outlined-basic" fullWidth
                                placeholder="Add ingredients"
                                variant="outlined"
                                rows={2}
                                multiline
                            />
                            {errors.ingredient && <div className='text-danger s14'>{errors?.ingredient?.message}</div>}

                        </div>

                        <h2 className='s24 mt-4 mb-2'>recipe</h2>
                        <TextField
                            {...register('recipe', { required: false, minLength: 2, maxLength: 1000 })}
                            id="outlined-basic" fullWidth
                            placeholder="Add recipe"
                            variant="outlined"
                            rows={4}
                            multiline
                        />

                        <h2 className='s24 mt-4 mb-2'>Servings</h2>
                        <div className='s16 mb-1'>How many portions does this dish make?</div>
                        <TextField
                            {...register('dishes', { required: true, pattern: '[0-9]*', min: 1, max: 30, minLength: 1, maxLength: 2 })}
                            id="outlined-basic"
                            fullWidth
                            variant="outlined"
                            type={"number"}
                            size='small'
                        />
                        {errors.dishes && <div className='text-danger s12'>Enter valid dishes </div>}

                        <h2 className='s24 mt-4 mb-2'>Calories</h2>
                        <div className='s16 mb-1'>How many calories are in this dish?</div>
                        <TextField
                            {...register('calories', { required: false, pattern: '[0-9]*', min: 2, max: 2000, minLength: 1, maxLength: 4 })}
                            id="outlined-basic"
                            fullWidth
                            variant="outlined"
                            type={"number"}
                            size='small'
                        />
                        {errors.calories && <div className='text-danger s12'>Enter valid calories </div>}


                        <h2 className='s24 mt-4 mb-2'>Prep time</h2>
                        <div className='s16 mb-1'>How long does it take to prepare this dish?</div>
                        <div className='d-flex justify-content-between mb-5'>
                            <div style={{ width: "48%" }}>
                                <TextField
                                    {...register('prepHours', { required: false, pattern: '[0-9]*', min: 0, max: 12, minLength: 1, maxLength: 2 })}
                                    placeholder="Hours 0"
                                    variant="outlined"
                                    type={"number"}
                                    size='small'
                                    fullWidth
                                />
                            </div>
                            <div style={{ width: "48%" }}>
                                <TextField
                                    {...register('prepMinutes', { required: false, pattern: '[0-9]*', min: 0, max: 60, minLength: 1, maxLength: 2 })}
                                    placeholder="Minutes 0"
                                    variant="outlined"
                                    size='small'
                                    type={"number"}
                                    fullWidth
                                />
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </form>

        </div >
    )
}
