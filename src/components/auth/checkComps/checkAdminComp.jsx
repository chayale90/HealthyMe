import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL, doApiGet } from '../../../services/apiService';
import {toast} from "react-toastify"

export default function CheckAdminComp() {
    let nav = useNavigate()

    useEffect(() => {
        doApi();
    }, []);
  
    const doApi = async () => {
        try {
            let url = API_URL + "/users/checkToken"
            let resp = await doApiGet(url);
            console.log(resp.data);
            if (resp.data.role != "admin") {
                toast.error("You must be admin to be here ,try log in again")
                nav("/")
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
