import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService'
import CheckAdminComp from '../checkAdminComp'
import FoodItem from './foodItem'

export default function FoodsList() {

  const [ar, setAr] = useState([])

  useEffect(() => {
    doApi()
  }, [])

  const doApi = async () => {
    //?page= איסוף
    //  let page = querys.get("page") || 1;
    let url = API_URL + "/foods";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
    }
  }


  return (
    <div className='container text-center'>
      <CheckAdminComp/>
      <h1 className='display-2'>List of foods</h1>
      {/* <PageNav urlPageApi={API_URL+"/foods/count"} perPage={5} navToDir="/admin/foods?page=" cssClass="btn btn-info ms-2"  /> */}
      <table className='table table-striped table-hover col-md-11'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Img_url</th>
            <th>Description</th>
            <th>Cals</th>
            <th>Ingredient</th>
            <th>Recipe</th>
            <th>Dishes</th>
            <th>PrepHours</th>
            <th>prepMin</th>
            <th>Likes</th>
            <th>Cat_url</th>
            <th>User_nick</th>
            <th>Active</th>
            <th>Date</th>
            <th>UpdatedAt</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <FoodItem key={item._id} index={i} item={item} doApi={doApi} />
            )
          })}
        </tbody>
      </table>
    </div>



  )
}
