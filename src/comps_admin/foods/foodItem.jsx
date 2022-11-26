import React from 'react'
import { Link } from 'react-router-dom'
import { API_URL, doApiMethod } from '../../services/apiService'

export default function FoodItem(props) {

    let item = props.item;

    const onDelClick = async() =>{
        if(window.confirm("Are you sure you want to delete: "+item.name)){
          try{
            let url = API_URL+"/foods/"+item._id;
            let resp = await doApiMethod(url,"DELETE");
            console.log(resp.data);
            if(resp.data.deletedCount == 1){
              props.doApi();
            }
          }
          catch(err){
            console.log(err.response);
            alert("There problem , try again later")
          }
        }
      }

    return (

        <tr>
            <th>{props.index + 1}</th>
            <th>{item.name}</th>
            <th>{item.url_name}</th>
       
            <th> <img src={item.img_url} alt="categoryImg" width="100" /></th>
            <th>{item.calories}</th>
            <th>{item.description}</th>
            <th>{item.ingredient}</th>
            <th>{item.recipe}</th>
            <th>{item.dishes}</th>
            <th>{item.prepHours}</th>
            <th>{item.prepMinutes}</th>
            <th>{item.likes.length}</th>
            <th>{item.categories_url}</th>
            <th>{item.user_nickname}</th>
            <th>{String(item.active)}</th>
            <th>{String(item.date_created).slice(0,10)}</th>
            <th>{String(item.updatedAt).slice(0,10)}</th>


            <td>
            <button onClick={() => {onDelClick()}} className='btn btn-danger'>Del</button>
            </td>
        </tr>

    )


}
