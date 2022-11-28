import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { API_URL, doApiGet } from '../../../services/apiService'
import CheckAdminComp from '../../auth/checkAdminComp'
import PageNav from '../../general_comps/pageNav'
import FoodItemAdmin from './foodItemAdmin'

export default function FoodsListAdmin() {

  const [ar, setAr] = useState([]);
  const [querys] = useSearchParams();
  useEffect(() => {
    doApi()
  }, [querys.get("page")])

  const doApi = async () => {
    //?page= 
    let page = querys.get("page") || 1;
    let url = API_URL + "/foods/?page="+page;
    try {
      let resp = await doApiGet(url);
      setAr(resp.data);
    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
    }
  }


  return (
    <div className='container text-center'>
      <CheckAdminComp />
      <h1 className='display-2'>List of foods</h1>
      <PageNav urlPageApi={API_URL + "/foods/count"} perPage={5} navToDir="/admin/foods?page=" cssClass="btn btn-info ms-2" />
      <table className='table table-striped table-hover col-md-11'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>img_url</th>
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
              <FoodItemAdmin key={item._id} index={i} item={item} doApi={doApi} />
            )
          })}
        </tbody>
      </table>
    </div>



  )
}
