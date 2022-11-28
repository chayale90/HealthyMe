import React from 'react'
import { API_URL, doApiMethod } from '../../../services/apiService';

export default function UserItemAdmin(props) {
    let item = props.item;

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
            alert("There problem, or you try to change superAdmin to user")
        }
    }


    const onDeleteClick = async () => {
        let url = API_URL + "/users/" + item._id
        try {
            if (window.confirm("Are you sure you want delete this user?")) {
                let resp = await doApiMethod(url, "DELETE")
                console.log(resp.data);
                if (resp.data) {
                    props.doApi();
                }
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
            <td>{item.sex}</td>
            <td>{item.height}</td>
            <td>{item.weight}</td>
            <td><button className='btn btn-success' onClick={onRoleClick}>{item.role}</button></td>
            <td>{item.rank}</td>
            <td>{item.score}</td>
            <td>{<img src={item.img_url} alt="Avatar" width={60} />}</td>
            <td>{item.nickname}</td>
            <td><button className='btn btn-warning' onClick={onActiveClick}>{String(item.active)}</button></td>
            <td>
                <button onClick={onDeleteClick} className='badge bg-danger'>Del</button>
            </td>
        </tr>
    )
}
