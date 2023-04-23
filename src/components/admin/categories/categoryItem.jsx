import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { API_URL, doApiMethod } from '../../../services/apiService'

export default function CategoryItem(props) {
    let item = props.item

    const [isOpen, setIsOpen] = useState(Boolean);

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const onDeleteClick = async () => {
        let url = API_URL + "/categories/" + item._id
        try {
            let resp = await doApiMethod(url, "DELETE")
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

    return (
        <tr>
            <th>{props.index + 1}</th>
            <th>{item.name}</th>
            <th>{item.url_name}</th>
            <th>{item.info}</th>
            <th>
                <img src={item.img_url} alt="categoryImg" width="100" />
            </th>
            <td>
                <Link className='btn btn-info me-2' to={"/admin/editCategory/" + item._id} >Edit</Link>
            </td>
            <td>
                <button onClick={handleClickOpen} className='btn btn-danger me-2 my-0'>Del</button>
            </td>
            {isOpen && <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want delete category " + item.name + "?"}
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
