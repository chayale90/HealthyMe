import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../../services/apiService';
import CheckAdminComp from '../../auth/checkAdminComp';
import PageNav from '../../general_comps/pageNav';
import UserItemAdmin from './userItemAdmin';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function UsersListAdmin() {
  const [ar, setAr] = useState([]);
  const [querys] = useSearchParams();
  const nav = useNavigate()
  const inputRef = useRef();


  useEffect(() => {
    doApi();
  }, [querys.get("page")])


  useEffect(() => {
    if (querys.get('search'))
      doApiSearch()
  }, [querys.get("search")])



  const doApi = async () => {
    //?page= 
    let page = querys.get("page") || 1;
    let url = API_URL + "/users/usersList?page="+page;
    try {
      let resp = await doApiGet(url);
      setAr(resp.data)
    }
    catch (err) {
      console.log(err);
      toast.error("there problem ,try again later")
    }
  }

  const doApiSearch = async () => {
    //search?
    let search = querys.get("search");
    let url = API_URL + "/users/search?s=" + search
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
    <div className='container'>
      <CheckAdminComp />
      <h1 className='display-5 text-center p-3'>List of users in systems</h1>
      <div className='col-md-6 d-flex mx-auto'>
       
        <input onKeyDown={(e) => {
          if(e.key=="Enter")
          nav('/admin/users?search=' + inputRef.current.value)
        }}   ref={inputRef} className='form-control' placeholder="Search user..." />
       
        <Button onClick={() => {
          nav('/admin/users?search=' + inputRef.current.value)
        }} variant="contained" color="info">Search</Button>

        <Button variant="contained" color='inherit'  onClick={doApi}>reset</Button>
      </div>

      <PageNav urlPageApi={API_URL + "/users/count"} perPage={5} navToDir="/admin/users?page=" cssClass="btn btn-info ms-2" />
      
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
