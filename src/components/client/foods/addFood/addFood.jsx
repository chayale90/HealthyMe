import React from 'react'
import "./addFood.css"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button, IconButton, TextField, ThemeProvider } from '@mui/material';
import { useForm } from 'react-hook-form';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Link, useNavigate } from 'react-router-dom';
import { theme } from '../../../../services/theme';
import { btnStyle, btnStyle3, btnStyle2 } from '../../../../services/btnStyle';
import CheckUserActiveComp from '../../../auth/checkComps/checkUserActiveComp';

export default function AddFood() {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();


    const onSubForm = async (bodyFormData) => {
        // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
        console.log(bodyFormData);
        await doApiForm(bodyFormData);

    }

    const doApiForm = async (bodyFormData) => {
        let url = API_URL + "/foods";
        try {
            let resp = await doApiMethod(url, "POST", bodyFormData);
            if (resp.data) {
                await doApiFileUpload(params["id"], fileRef);
                toast.success("Category update succefuly");
                nav("/admin/categories")
            }
            else {
                toast.error("There problem, try again later")
            }
        }
        catch (err) {
            console.log(err);
            alert("There problem , or category url already in system")
        }
    }


    return (
        <div className='container mt-3 mb-4'>
              <CheckUserActiveComp/>
            <form onSubmit={handleSubmit(onSubForm)}>
                <ThemeProvider theme={theme}>

                    <div className='mx-auto navButtons'>
                        <div >
                            <IconButton
                                onClick={() => {
                                    nav("/foods")
                                }}
                                aria-label="search">
                                <KeyboardArrowLeftIcon />

                            </IconButton>
                            Back
                        </div>

                        <Button
                          className='saveBtn'
                            sx={btnStyle}
                        >save
                        </Button>

                    </div>

                    <div className="mx-auto mainAddFood pt-4" >

                        <h2 className='s24 mb-2'>Dish Name</h2>
                        <TextField id="outlined-basic" fullWidth
                            placeholder="Give your dish a name"
                            size='small'
                            variant="outlined"
                        />


                        <div className='addPhotoDiv text-center my-4 '>
                            <div>
                                <AddAPhotoIcon sx={{ color: '#A435F0' }} />
                                <div className='d-block'>Add photo</div>
                            </div>
                        </div>

                        <h2 className='s24 mb-2'>Ingredients</h2>
                        <TextField id="outlined-basic" fullWidth
                            placeholder="Add ingredients"
                            variant="outlined"
                            rows={2}
                            multiline
                        />


                        <h2 className='s24 mt-4 mb-2'>recipe</h2>
                        <TextField id="outlined-basic" fullWidth
                            placeholder="Add recipe"
                            variant="outlined"
                            rows={4}
                            multiline
                        />

                        <h2 className='s24 mt-4 mb-2'>Servings</h2>
                        <div className='s16 mb-1'>How many portions does this dish make?</div>
                        <TextField id="outlined-basic" fullWidth
                            variant="outlined"
                            type={"number"}
                            size='small'
                        />


                        <h2 className='s24 mt-4 mb-2'>Calories</h2>
                        <div className='s16 mb-1'>How many calories are in this dish?</div>
                        <TextField id="outlined-basic" fullWidth
                            variant="outlined"
                            type={"number"}
                            size='small'
                        />



                        <h2 className='s24 mt-4 mb-2'>Prep time</h2>
                        <div className='s16 mb-1'>How long does it take to prepare this dish?</div>
                        <div className='d-flex justify-content-between mb-5'>
                            <div style={{width:"48%"}}>
                                <TextField
                                    placeholder="Hours 0"
                                    variant="outlined"
                                    type={"number"}
                                    size='small'
                                    fullWidth
                                />
                            </div>
                            <div style={{width:"48%"}}>
                                <TextField
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
