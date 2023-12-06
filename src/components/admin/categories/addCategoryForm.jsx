//3rd library
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
// project imports
import { API_URL, doApiMethod } from '@/services/apiService';
import { uploadImgCategory } from '@/services/fileUploadFun';
import CheckAdminComp from '../../auth/checkComps/checkAdminComp';


export default function AddCategoryForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();
    const fileRef = useRef();

    const onSubAddCategory = async (bodyFormData) => {
        const url = `${API_URL}/categories`;
        try {
            let resp = await doApiMethod(url, "POST", bodyFormData);
            if (resp.data) {
                toast.success("Category added succefully");
                const uploadSuccess = await uploadImgCategory(resp.data._id, fileRef)
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
            toast.error("There problem , or category url already in system")
        }
    }


    return (
        <div className='container'>
            <CheckAdminComp />
            <h2 className='text-center display-4'>Add new category</h2>
            <form onSubmit={handleSubmit(onSubAddCategory)} className='col-md-8 p-3 shadow mx-auto'>
                <label>Name:</label>
                <input  {...register("name", { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.name && <div className='text-danger'>Enter valid name (min 2 chars) </div>}

                <label>Url name:</label>
                <input {...register("url_name", { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.url_name && <div className='text-danger'>Enter valid url name (min 2 chars) </div>}

                <label>Info:</label>
                <textarea  {...register("info", { required: true, minLength: 2 })} className='form-control' rows="5"></textarea>
                {errors.info && <div className='text-danger'>Enter valid info  (min 2 chars) </div>}

                <label>Img url:</label>
                <input ref={fileRef} type="file" className='form-control' />

                <div className='mt-3'>
                    <button className='btn btn-success me-3'>Add</button>
                    <Link className='btn btn-danger' to="/admin/categories">Back</Link>
                </div>
            </form>
        </div>
    )
}
