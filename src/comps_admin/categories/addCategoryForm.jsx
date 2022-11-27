import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, doApiMethod } from '../../services/apiService';
import CheckAdminComp from '../checkAdminComp';

export default function AddCategoryForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();

    const onSubForm = () => {
        console.log(bodyFormData)
        doApi(bodyFormData);
    }

    const doApi = async (bodyFormData) => {
        let url = API_URL + "/categories";
        try {
            let resp = doApiMethod(url, "POST", bodyFormData);
            if (resp.data_id) {
                alert("Food added succefuly");
                nav("/admin/categories")
            }
            else{
                alert("There problem , try again later")
              }
        }
        catch (err) {
            console.log(err);
            alert("There problem , or category url already in system")
        }
    }


    return (
        <div className='container'>
            <CheckAdminComp/>
            <h2 className='text-center display-4'>Add new category</h2>
            <form onSubmit={handleSubmit(onSubForm)} className='col-md-8 p-3 shadow mx-auto'>
                <label>Name:</label>
                <input  {...register("name", { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.name && <div className='text-danger'>Enter valid name (min 2 chars) </div>}

                <label >Url name:</label>
                {/* disabled={true} - לא מאפשר לגעת באינפוט */}
                <input  disabled={true} className='form-control' />
                {errors.url_name && <div className='text-danger'>Enter valid url name (min 2 chars) </div>}
                <label>Info:</label>
                <textarea  {...register("info", { required: true, minLength: 2 })} className='form-control' rows="5"></textarea>
                {errors.info && <div className='text-danger'>Enter valid info  (min 2 chars) </div>}
                <label>Img url:</label>
                <input  {...register("img_url", { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.img_url && <div className='text-danger'>Enter valid url   (min 2 chars) </div>}

                <div className='mt-3'>
                    <button className='btn btn-success me-3'>Update</button>
                    <Link className='btn btn-danger' to="/admin/categories">Back</Link>
                </div>
            </form>
        </div>
    )
}
