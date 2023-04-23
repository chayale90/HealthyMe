import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../../services/apiService';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


export default function FoodItemAdmin(props) {
  let item = props.item;
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onDeleteClick = async () => {
    try {
      let url = API_URL + "/foods/" + item._id;
      let resp = await doApiMethod(url, "DELETE");
      console.log(resp.data);
      if (resp.data.deletedCount == 1) {
        props.doApi();
      }
    }
    catch (err) {
      console.log(err.response);
      toast.error("There problem , try again later")
    }
  }

  return (

    <tr>
      <th>{props.index + 1}</th>
      <th>{item.name}</th>
      <th>{item.description}</th>
      <th> <img src={item.img_url} alt="categoryImg" width="100" /></th>
      <th>{item.calories}</th>
      <th>{item.ingredient}</th>
      <th>{item.recipe}</th>
      <th>{item.dishes}</th>
      <th>{item.prepHours}</th>
      <th>{item.prepMinutes}</th>
      <th>{item.likes.length}</th>
      <th>{item.categories_url}</th>
      <th>{item.user_nickname}</th>
      <th>{String(item.active)}</th>
      <th>{String(item.date_created).slice(0, 10)}</th>
      <th>{String(item.updatedAt).slice(0, 10)}</th>

      <td>
        <Button variant='contained' color='error' onClick={() => { handleClickOpen() }} className='btn btn-danger'>Del</Button>
      </td>
    { isOpen&& <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete " + item.name}
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
