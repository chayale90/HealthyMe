import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { addUser } from "../features/userSlice"
import { API_URL, doApiGet } from './apiService';

export default function MyInfo() {
    const { user } = useSelector(myStore => myStore.userSlice)
    const dispatch = useDispatch();
    // console.log(user);
    // const [] = useState(false);

    useEffect(() => {
        doApiInfoUser()
    }, [])


    const doApiInfoUser = async () => {
        const url = API_URL + "/users/myInfo"
        try {
            let { data } = await doApiGet(url);
            // console.log(data);
            dispatch(addUser({ val: data }))
        }
        catch (err) {
            console.log(err);
            toast.error("there problem ,try again later")
        }
    }
    return [doApiInfoUser];


}
