import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_URL, doApiGet } from '../../../services/apiService'
import CheckAdminComp from '../../auth/checkComps/checkAdminComp';
import CategoryItem from './categoryItem'

export default function CategoriesList() {
  const [ar, setAr] = useState([])

  useEffect(() => {
    doApi()
  }, [])

  const doApi = async () => {
    let url = API_URL + "/categories"
    try {
      let resp = await doApiGet(url);
      setAr(resp.data)
      console.log(resp.data);
    }
    catch (err) {
      console.log(err);
      toast.error(`there problem, try later`)
    }
  }


  return (
    <div className='container'>
      <CheckAdminComp />
      <h1 className='display-5 text-center p-3'>List of Catgories in systems</h1>
      <Link to="/admin/addCategory" className='btn btn-success'>Add new Category</Link>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>url_name</th>
            <th>info</th>
            <th>img_url</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
              return (
              <CategoryItem key={item._id} doApi={doApi} index={i} item={item} />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
