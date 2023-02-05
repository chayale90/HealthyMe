import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../../services/apiService';
import { setOpenFollowers, setOpenFollowings } from "../../../features/dialogSlice"

export default function CheckUserActiveComp() {
    let nav = useNavigate()
    const { user } = useSelector(myStore => myStore.userSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        try {
            let url = API_URL + "/users/checkToken"
            let resp = await doApiGet(url);
            // console.log(resp.data);
            if (resp.data.role != "user") {
                toast.error("You must be user to be here ,try log in again");
                dispatch(setOpenFollowers({ val: false }))
                dispatch(setOpenFollowings({ val: false }))
                nav("/")
            }
            else if (user.active != true) {
                toast.error("You must be active to be here, you just can see the foodsList and your profile");
                dispatch(setOpenFollowers({ val: false }))
                dispatch(setOpenFollowings({ val: false }))
                nav("/foods")
            }
        }
        catch (err) {
            toast.error("There problem ,try log in again");
            nav("/")
        }
    }

    return (
        <React.Fragment></React.Fragment>
    )
}
