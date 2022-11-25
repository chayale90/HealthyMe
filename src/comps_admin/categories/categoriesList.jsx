import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService'
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
      console.log(resp.data);
      setAr(resp.data)
    }
    catch (err) {
      console.log(err);
      alert("there problem, try later")
    }
  }



  return (
    <div className='container'>
    <h1>List of users in systems</h1>
    <table className='table table-striped table-hover'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>url_name</th>
          <th>info</th>
          <th>img_url</th>
        </tr>
      </thead>
      <tbody>
        {ar.map((item,i) => {
          return(
            <CategoryItem key={item._id} doApi={doApi} index={i} item={item}/>
          )
        })}
      </tbody>
    </table>
  </div>
  )
}
