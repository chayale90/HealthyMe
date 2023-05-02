import React, { useEffect, useRef, useState } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button, FormControl, IconButton, InputLabel, TextField, ThemeProvider } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from '@mui/material/Select';
import { CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { theme } from '../../../../services/theme';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { btnStyle, btnStyle3, btnStyle2 } from '../../../../services/btnStyle';
import CheckUserActiveComp from '../../../auth/checkComps/checkUserActiveComp';
import { API_URL, doApiGet, doApiMethod } from '../../../../services/apiService';
import { doApiFileUploadFood, doApiFileEditFood } from '../../../../services/fileUploadFun';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoading } from "../../../../features/featuresSlice";

export default function AddFood() {
    const nav = useNavigate();
    const fileRef = useRef();
    const inputRef = useRef();
    const params = useParams();
    const dispatch = useDispatch()
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const { user } = useSelector(myStore => myStore.userSlice);
    const [selectedOption, setSelectedOption] = useState("");
    const [fileChosen, setfileChosen] = useState("No Img Edit");
    const [image, setImage] = useState(null);
    const [displayDiv, setDisplayDiv] = useState("block");
    const [foodInfo, setFoodInfo] = useState({});
    const [displayProgress, setDisplayProgress] = useState("none");

    useEffect(() => {
        doApiInit()
    }, [])

    const doApiInit = async () => {
        try {
            let url = API_URL + "/foods/foodInfo/" + params["id"];
            let resp = await doApiGet(url);
            setFoodInfo(resp.data)
            // console.log(resp.data);
        }
        catch (err) {
            console.log(err);
            toast.error("There problem try come back later")
        }
    }

    const onSubForm = async (bodyFormData) => {
        console.log(bodyFormData);
        await doApiEditFood(bodyFormData);
    }

    const doApiEditFood = async (bodyFormData) => {
        setDisplayProgress("flex")
        const url = API_URL + "/foods/" + params["id"];
        try {
            let resp = await doApiMethod(url, "PUT", bodyFormData);
            // console.log(resp.data);
            if (resp.data) {
                await doApiFileEditFood(resp.data._id, fileRef);
                dispatch(changeLoading())
                toast.success("Your Dish edits succefuly!");
                nav("/myFoodInfo/" + params["id"])
            }
            else {
                toast.error("There problem, try again later")
                setDisplayProgress("none")
            }
        }
        catch (err) {
            console.log(err);
            alert("There problem , or category url already in system")
            setDisplayProgress("none")
        }
    }

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

    return (
        <div className='container mt-3 mb-4'>
            <CheckUserActiveComp />
            <ThemeProvider theme={theme}>
                {foodInfo.name ?
                    <form onSubmit={handleSubmit(onSubForm)}>

                        <div className='mx-auto navButtons'>
                            <div> <IconButton
                                onClick={() => {
                                    nav("/myFoodInfo/" + params["id"])
                                }}
                                aria-label="back">
                                <KeyboardArrowLeftIcon />
                            </IconButton>Back</div>

                            <Button type='submit'
                                className='saveBtn'
                                sx={btnStyle}
                                endIcon={<CircularProgress sx={{ display: displayProgress }} size={"20px"} color="success" />}
                            >Save
                            </Button>
                        </div>

                        <div className="mx-auto mainAddFood" >
                            <div className=''>
                                <h2 className='s24 mt-3 '>Dish Name</h2>
                                <TextField
                                    {...register('name', { required: { value: true, message: 'Name is requried' }, minLength: { value: 3, message: "First name must be at least 3 characters" }, maxLength: 99 })}
                                    id="outlined-basic"
                                    fullWidth
                                    size='small'
                                    variant="outlined"
                                    defaultValue={foodInfo.name}
                                />
                                {errors.name && <div className='text-danger s14'>{errors?.name?.message}</div>}
                            </div>

                            {/* file */}
                            <div className='text-center mt-5'>

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

                                <img className='addPhotoDiv' src={!image ? foodInfo.img_url : image} alt="Uploaded" style={{ position: 'relative', zIndex: 0 }} />
                                {image && <span id="file-chosen">{fileChosen}</span>}

                                <div style={{ display: displayDiv }}>
                                    <input
                                        // {...register('img_url', { required: true })}
                                        type="file" id="actual-btn"
                                        ref={fileRef}
                                        hidden
                                        onInput={handleChange}
                                    />
                                    <label style={{ cursor: 'pointer' }} className='mb-1 editPhotoDiv' htmlFor="actual-btn"><CameraAltIcon sx={{ color: "#A435F0" }} />Edit photo</label>
                                </div>
                            </div>


                            <FormControl fullWidth sx={{ mt: 5, mb: 4 }}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    {...register('categories_url', { required: true, minLength: 2, maxLength: 99 })}
                                    labelId="demo-select-small"
                                    id="select-category"
                                    value={selectedOption || foodInfo.categories_url}
                                    label="Category"
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                    name="categories_url"
                                // defaultValue={foodInfo.category_url}
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
                                    id="outlined-basic"
                                    fullWidth
                                    placeholder="Descrip your dish.."
                                    variant="outlined"
                                    defaultValue={foodInfo.description}
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
                                    defaultValue={foodInfo.ingredient}
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
                                defaultValue={foodInfo.recipe}
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
                                defaultValue={foodInfo.dishes}
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
                                defaultValue={foodInfo.calories}
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
                                        defaultValue={foodInfo.prepHours}
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
                                        defaultValue={foodInfo.prepMinutes}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    :
                    <div style={{ display: "flex", alignItems: "center", minHeight: '300px' }}>
                        <div style={{ margin: "0 auto" }}>
                            <CircularProgress size={"80px"} />
                        </div>
                    </div>
                }

            </ThemeProvider>
        </div >
    )
}
