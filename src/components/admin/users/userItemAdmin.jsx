import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { API_URL, doApiMethod } from '../../../services/apiService';

export default function UserItemAdmin(props) {
    const [isOpen, setIsOpen] = useState(Boolean);
    let item = props.item;

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const onRoleClick = async () => {
        let bodyData;
        if (item.role == "user") {
            bodyData = { role: "admin" }
        }
        else {
            bodyData = { role: "user" }
        }
        let url = API_URL + "/users/changeRole/" + item._id
        try {
            let resp = await doApiMethod(url, "PATCH", bodyData)
            console.log(resp.data);
            if (resp.data) {
                props.doApi();
            }
        }
        catch (err) {
            console.log(err);
            alert("There problem, or you try to change superAdmin to user")
        }
    }

    const onActiveClick = async () => {
        let bodyData;
        if (item.active == true) {
            bodyData = { active: false }
        }
        else {
            bodyData = { active: true }
        }

        let url = API_URL + "/users/changeActive/" + item._id
        try {
            let resp = await doApiMethod(url, "PATCH", bodyData)
            console.log(resp.data);
            if (resp.data) {
                props.doApi();
            }
        }
        catch (err) {
            console.log(err);
            toast.error("There problem, or you try to change superAdmin to user")
        }
    }


    const onDeleteClick = async () => {
        let url = API_URL + "/users/" + item._id
        try {
            let resp = await doApiMethod(url, "DELETE")
            console.log(resp.data);
            if (resp.data) {
                props.doApi();
            }
        }
        catch (err) {
            console.log(err);
            alert("There problem, or you try to change superAdmin to user")
        }
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td><img src={item.img_url} alt="Avatar" width={60} /></td>
            <td>{item.sex}</td>
            <td>{item.height}</td>
            <td>{item.weight[item.weight.length-1].myWeight}</td>
            <td>
                <Button disableElevation onClick={onRoleClick} color="success" variant="contained">{item.role}</Button>
            </td>
            <td>{item.rank}</td>
            <td>{item.score}</td>

            <td>{item.nickname}</td>
            <td><Button color="secondary" variant="outlined" onClick={onActiveClick}>{String(item.active)}</Button></td>
            <td>
                <Button color="error" variant="contained" onClick={handleClickOpen} >Del</Button>
            </td>
            {isOpen && <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want delete this user?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={onDeleteClick} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
            }
        </tr>
    )
}
