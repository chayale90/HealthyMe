import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
// project imports
import { API_URL, doApiGet, doApiMethod } from '@/services/apiService';
import { uploadImgCategory } from '@/services/fileUploadFun';
import CheckAdminComp from '../../auth/checkComps/checkAdminComp';

export default function EditCategory() {
  const [info, setInfo] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();
  const fileRef = useRef();
  const params = useParams();

  useEffect(() => {
    doApiInit()
  }, [])

  const doApiInit = async () => {
    try {
      let url = API_URL + "/categories/byId/" + params["id"];
      let resp = await doApiGet(url);
      setInfo(resp.data)
      console.log(resp.data);
    }
    catch (err) {
      console.log(err);
      toast.error("There problem try come back later")
    }
  }

  const onEditCategory = async (bodyFormData) => {
    let url = API_URL + "/categories/" + params["id"];
    try {
      let resp = await doApiMethod(url, "PUT", bodyFormData);
      if (resp.data) {
        toast.success("Category update succefuly");
        const uploadSuccess = await uploadImgCategory(params["id"], fileRef);
        if (uploadSuccess) {
          nav("/admin/categories");
        }
        else toast.error("There was a problem uploading the image");
      }
      else {
        toast.error("There problem, try again later")
      }
    }
    catch (err) {
      console.log(err);
      alert("There problem , or category url already in system")
    }
  }


  return (
    <div className='container'>
      <CheckAdminComp />
      <h2 className='text-center display-4'>Edit category</h2>
      {info.name ?
        <form onSubmit={handleSubmit(onEditCategory)} className='col-md-8 p-3 shadow mx-auto'>
          <label>Name:</label>
          <input defaultValue={info.name} {...register("name", { required: true, minLength: 2 })} type="text" className='form-control' />
          {errors.name && <div className='text-danger'>Enter valid name (min 2 chars) </div>}

          <label >Url name:</label>
          <input value={info.url_name} disabled className='form-control' />

          <label>Info:</label>
          <textarea defaultValue={info.info} {...register("info", { required: true, minLength: 2 })} className='form-control' rows="5"></textarea>
          {errors.info && <div className='text-danger'>Enter valid info  (min 2 chars) </div>}

          <label>Img url:</label>
          <input ref={fileRef} type="file" className='form-control' />

          <img className='my-2' src={info.img_url} alt="img" height="100" />

          <div className='mt-3'>
            <button className='btn btn-success me-3'>Update</button>
            <Link className='btn btn-danger' to="/admin/categories">Back</Link>
          </div>
        </form> : <h2>Loading...</h2>}
    </div>
  )
}
