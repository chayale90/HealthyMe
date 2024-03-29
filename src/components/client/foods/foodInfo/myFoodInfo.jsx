//3rd library
import { Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
// project imports
import { API_URL, doApiGet, doApiMethod } from '@/services/apiService';
import { theme } from "@/services/theme"
import { changeHome } from "@/features/featuresSlice"
import { setOpenUsersLikes } from "@/features/dialogSlice"
import DialogUsersLikes from './usersLikes/dialogUsersLikes';
import FabComp from '@/services/fabComp';
import "./foodInfo.css"
import LoadingComp from '../../../general_comps/loadingComp';

export default function MyFoodInfo() {
    const { user } = useSelector(myStore => myStore.userSlice);
    const params = useParams()
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [food, setFood] = useState({})
    const [otherUser, setOtherUser] = useState({});
    const foodId = params["id"]

    useEffect(() => {
        dispatch(changeHome({ val: "none" }))
        doApiGetFoodInfo();
    }, [])

    const doApiGetFoodInfo = async () => {
        try {
            const url = API_URL + "/foods/foodInfo/" + foodId;
            const resp = await doApiGet(url);
            setFood(resp?.data)
           await doApiGetInfoUser(resp.data.user_id)
        } catch (err) {
            console.log(err);
            toast.error("There problem try come back later");
        }
    };

    const doApiGetInfoUser = async (user_id) => {
        try {
            const url = API_URL + "/users/userInfo/" + user_id;
            const resp = await doApiGet(url);
            setOtherUser(resp.data);
        } catch (err) {
            console.log(err);
            toast.error("There problem try come back later");
        }
    };

    //dialog open-close
    const [isOpen, setIsOpen] = useState(Boolean);

    // dialog Logout option functions
    const handleClose = () => {
        setIsOpen(false);
    };
    const ClickDelete = () => {
        setIsOpen(true);
    };

    const onDeleteFood = async () => {
        try {
            const url = API_URL + "/foods/" + foodId;
            const resp = await doApiMethod(url, "DELETE");
            console.log(resp.data);
            if (resp.data) {
                toast.success("The dish delete succefuly");
                nav("/foods")
            }
        } catch (err) {
            console.log(err);
            toast.error("There problem try come back later");
        }
    };

    const srcImg = React.useMemo(() => {
        if (user.img_url == "" && user.sex == "male") {
            return "/images/man.png";
        } else if (user.img_url == "" && user.sex == "female") {
            return "/images/woman.png";
        } else {
            return user.img_url;
        }
    }, [user]);

    // dialog Followers option functions 
    const onClickLikes = () => {
        dispatch(setOpenUsersLikes({ val: true }))
    };

    return (
        <ThemeProvider theme={theme}>
            <div className='container mt-md-5 mt-4'>
                {food._id ?
                    <div>
                        <div style={{ position: 'relative' }} className='row align-items-center'>
                            <div style={{ position: 'relative' }} className='col-4 d-none d-md-block p-0'>
                                <img className='imgFoodInfo' style={{ borderRadius: "12px" }} src={`${food.img_url}?${Date.now()}`} alt="foodImg" />
                                <div className='likesDiv m-1'
                                    onClick={onClickLikes}>
                                    <FavoriteIcon sx={{ marginRight: 1, color: "white" }} />
                                    {food?.likes?.length} Likes
                                </div>
                            </div>

                            <div className="d-flex d-md-none align-items-center">
                                <Avatar
                                    sx={{ float: "start", width: 33, height: 33 }}
                                    src={srcImg}
                                    alt="AvatarOfFood"
                                />
                                <Link style={{ fontWeight: 500 }} className="s16 ms-2 dark underLine"
                                    to={"/myProfile"}
                                >
                                    {otherUser.name}
                                </Link>
                            </div>

                            <div className='col-auto mt-2 mt-md-0 mx-auto mx-md-0 ms-md-3 pe-0'>
                                <div className="d-none d-md-flex align-items-center mb-4  mt-lg-2 mt-0">
                                    <Avatar
                                        sx={{ float: "start", width: 33, height: 33 }}
                                        src={srcImg}
                                        alt="AvatarOfFood"
                                    />
                                    <Link style={{ fontWeight: 500 }} className="s16 ms-2 dark underLine"
                                        to={"/myProfile"}
                                    >
                                        {otherUser.name}
                                    </Link>
                                </div>

                                <h1 className='s30 text-center text-md-start mt-4 mt-md-0'>{food.name}</h1>
                                <div className='s18 text-center text-md-start mb-4 mb-md-0 mb-lg-4'>{food.description}</div>
                                <div className='d-flex align-items-center'>
                                    <div className="d-block d-md-flex text-center">
                                        <div> <AccessTimeIcon className='me-2' /></div>
                                        {food.prepHours == null || food.prepHours == 0 ? "" : food.prepHours + " hrs"}  {food.prepMinutes == null ? "" : food.prepMinutes + " min"}
                                    </div>
                                    <hr className='hr' />

                                    <div className="d-block d-md-flex text-center"> <img className='me-2 mb-1' src="/images/dishes.png" alt="clockIcon" />
                                        <div>{food.dishes} dishes</div></div>

                                    {food.calories && <hr className='hr' />}

                                    {food.calories &&
                                        <div className='d-block d-md-flex text-center'>
                                            <div> <img className='me-2 ' src="/images/calories.png" alt="clockIcon" /></div>
                                            <div >{food.calories} calories</div>
                                        </div>
                                    }

                                </div>
                            </div>

                            <div className='d-block d-md-none mt-4 mx-auto'>
                                <img className='imgFoodInfo' style={{ borderRadius: "12px", position: 'relative' }} src={`${food?.img_url}?${Date.now()}`} alt="foodImg" />
                                <div className='likesDiv m-1 ms-3'
                                    onClick={onClickLikes}>
                                    <FavoriteIcon sx={{ marginRight: 1, color: "white" }} />
                                    {food?.likes?.length} Likes
                                </div>
                            </div>

                            <div>
                                <IconButton
                                    style={{ position: 'absolute', right: 0, top: 0 }}
                                    onClick={ClickDelete}
                                >
                                    < DeleteIcon />
                                </IconButton>

                                <IconButton
                                    style={{ position: 'absolute', right: 45, top: 0, border: "0.5px solid #A7A7A7" }}
                                    onClick={() => { nav("/editFood/" + foodId) }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </div>

                            {isOpen &&
                                <Dialog
                                    open={isOpen}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <div className='p-3'>
                                        <DialogTitle
                                            sx={{ mb: 2 }}
                                            id="alert-dialog-title">
                                            Are you sure you want to delete {food.name} dish?
                                        </DialogTitle>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Disagree</Button>
                                            <Button onClick={onDeleteFood} autoFocus>Agree</Button>
                                        </DialogActions>
                                    </div>
                                </Dialog>
                            }
                        </div>

                        <hr className='mt-5 mb-4' />
                        <div className='mx-md-5'>
                            <h3 className='s24'>Ingredients</h3>
                            <p>{food.ingredient}</p>
                        </div>

                        <div className='mx-md-5 my-5 '>
                            {food.recipe &&
                                <div>
                                    <h3 className='s24'>Recipe</h3>
                                    <p>{food.recipe}</p>
                                </div>
                            }
                        </div>

                        <FabComp />

                    </div>
                    :
                    <LoadingComp minHeight="300px" size="80px"/>

                }

            </div>
            <DialogUsersLikes foodID={foodId} />
        </ThemeProvider>
    )
}
