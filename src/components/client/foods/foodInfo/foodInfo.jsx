import { Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../../../../services/apiService';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useDispatch, useSelector } from 'react-redux';
import { changeHome } from "../../../../features/homeSlice"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../../services/theme"
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./foodInfo.css"

export default function FoodInfo() {
    const { user } = useSelector(myStore => myStore.userSlice);
    const params = useParams()
    const [food, setFood] = useState({})
    const foodId = params["id"]
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [userName, setUserName] = useState("");
    const [userImg, setUserImg] = useState("");

    useEffect(() => {
        dispatch(changeHome({ val: "none" }))
        doApiGetFoodInfo()
    }, [])

    const doApiGetFoodInfo = async () => {
        try {
            const url = API_URL + "/foods/foodInfo/" + foodId;
            const resp = await doApiGet(url);
            console.log(resp.data);
            setFood(resp.data)
            doApiGetInfoUser()

        } catch (err) {
            console.log(err);
            toast.error("There problem try come back later");
        }
    };

  
    const doApiGetInfoUser = async () => {
      try {
        const url = API_URL + "/users/userInfo/" + food.user_id;
        const resp = await doApiGet(url);
        // console.log(resp.data);
        setUserName(resp.data.name);
        setUserImg(resp.data.img_url);
      } catch (err) {
        console.log(err);
        toast.error("There problem try come back later");
      }
    };
  

    return (
        <ThemeProvider theme={theme}>
            <div className='container mt-md-5 mt-4'>

                {food._id ?
                    <div>
                        <div style={{ position: 'relative' }} className='row align-items-center'>
                            <div className='col-4 d-none d-md-block p-0'>
                                <img className='imgFoodInfo' style={{ borderRadius: "12px" }} src={food.img_url} alt="foodImg" />
                                <div className='likesDiv m-1'>  <FavoriteIcon sx={{ color: "#A435F0", marginRight: 1 }} />{food?.likes?.length} Likes</div>
                            </div>

                            <div className="d-flex d-md-none align-items-center ">
                                <Avatar
                                    sx={{ float: "start", width: 33, height: 33 }}
                                    src={userImg}
                                alt="AvatarOfFood"
                                />
                                <Link style={{ fontWeight: 500 }} className="s16 ms-2 dark underLine"
                                    to={(user._id == food.user_id) ? "/myProfile" : "/userProfile/" + food.user_id}
                                >
                                    {userName}
                                </Link>
                            </div>

                            <div className='col-auto mt-2 mt-md-0 mx-auto mx-md-0 ms-md-3 pe-0'>
                                <div className="d-none d-md-flex align-items-center mb-2 mb-lg-4 mt-lg-2 mt-0">
                                    <Avatar
                                        sx={{ float: "start", width: 33, height: 33 }}
                                        src={userImg}
                                        alt="AvatarOfFood"
                                    />
                                    <Link style={{ fontWeight: 500 }} className="s16 ms-2 dark underLine"
                                        to={(user._id == food.user_id) ? "/myProfile" : "/userProfile/" + food.user_id}
                                    >
                                        {userName}
                                    </Link>
                                </div>

                                <h1 className='s30 text-center text-md-start mt-4 mt-md-0'>{food.name}</h1>
                                <div className='s18 text-center text-md-start mb-2 mb-lg-4'>{food.description}</div>
                                <div className='d-flex align-items-center'>
                                    <div className="d-block d-md-flex text-center">
                                        <div> <AccessTimeIcon className='me-2' /></div>
                                        prep: {food.prepHours == null || food.prepHours == 0 ? "" : food.prepHours + " hrs"}  {food.prepMinutes} min
                                    </div>
                                    <hr className='hr' />

                                    <div className="d-block d-md-flex text-center"> <img className='me-2 mb-1' src="/images/dishes.png" alt="clockIcon" />
                                        <div>{food.dishes} dishes</div></div>

                                    {food.calories && <hr className='hr' />}

                                    {food.calories &&
                                        <div className='d-block d-md-flex text-center'>
                                            <div> <img className='me-2 mb-md-1 pb-md-1' src="/images/calories.png" alt="clockIcon" /></div>
                                            <div className='mt-md-1'>{food.calories} calories</div>
                                        </div>
                                    }

                                </div>
                            </div>

                            <div className='d-block d-md-none mt-4 mx-auto'>
                                <img className='imgFoodInfo' style={{ borderRadius: "12px", position: 'relative' }} src={food.img_url} alt="foodImg" />
                                <div className='likesDiv mb-1 ms-3'>  <FavoriteIcon sx={{ color: "#A435F0", marginRight: 1 }} />{food?.likes?.length} Likes</div>                    </div>

                            <div>
                                <IconButton
                                    style={{ position: 'absolute', right: 10, top: 0 }}
                                // onClick={""}
                                >
                                    <FavoriteBorderIcon />
                                </IconButton>
                            </div>

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

                        <Fab
                            sx={{ background: "#A435F0", color: "white", "&:hover": { color: "white", background: "#912CD6" }, position: 'sticky', bottom: 70, left: 1900 }}
                            onClick={() => { nav("/addFood") }}
                            aria-label="addFood">
                            <AddIcon />
                        </Fab>

                    </div> :
                    <div style={{ display: "flex", alignItems: "center", minHeight: '300px' }}>
                        <div style={{ margin: "0 auto", color: "#A435F0" }}>
                            <CircularProgress size={"100px"} />
                        </div>
                    </div>
                }
            </div>
        </ThemeProvider>
    )
}
