import React, { useEffect, useRef, useState } from 'react'
import { API_URL, doApiGet } from '../../../services/apiService';
import CheckAdminComp from '../../auth/checkAdminComp';
import UserItemAdmin from './userItemAdmin';


export default function UsersListAdmin() {
  const [ar, setAr] = useState([]);
  const inputRef = useRef();

 
  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = API_URL + "/users/usersList";
    try {
      let resp = await doApiGet(url);
      setAr(resp.data)
    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
    }
  }

  return (
    <div className='container'>
      <CheckAdminComp />
      <h1 className='display-3 text-center p-3'>List of users in systems</h1>
      <div className='col-md-6 d-flex'><input ref={inputRef} className='form-control' placeholder="Search user..." />  <button className=' btn btn-info'>Search</button></div>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Sex</th>
            <th>height</th>
            <th>weight</th>
            <th>Role</th>
            <th>Rank</th>
            <th>Score</th>
            <th>Img_url</th>
            <th>Nickname</th>
            <th>Active</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {ar.map((item, i) => {
            return (
              <UserItemAdmin key={item._id} doApi={doApi} index={i} item={item} />
            )
          })}
        </tbody>

      </table>
    </div>
  )
}
