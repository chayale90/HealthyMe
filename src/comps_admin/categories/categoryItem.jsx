import React from 'react'
import { Link } from 'react-router-dom'
import { API_URL, doApiMethod } from '../../services/apiService'

export default function CategoryItem(props) {
    let item = props.item


    const onDeleteClick = async () => {
        let url = API_URL + "/categories/" + item._id
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
            <th>{props.index + 1}</th>
            <th>{item.name}</th>
            <th>{item.url_name}</th>
            <th>{item.info}</th>
            <th> <img src={item.img_url} alt="categoryImg" width="100" /></th>
            <td>
            <Link className='btn btn-info me-2' to={"/admin/editCategory/"+item._id} >Edit</Link>

            </td>
            <td>
                <button onClick={onDeleteClick}  className='btn btn-danger me-2 my-0'>Del</button>
            </td>
        </tr>
    )
}
