import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { doApiMethod, API_URL, TOKEN_NAME } from '../services/apiService';

export default function LoginAdmin() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();


    const onSubForm = (bodyData) => {
        // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
        console.log(bodyData)
        doApiForm(bodyData);
    }

    const doApiForm = async (bodyData) => {
        let url = API_URL + "/users/login"
        try {
          let resp = await doApiMethod(url,"POST",bodyData);
            // לשמור את הטוקן
            localStorage.setItem(TOKEN_NAME,resp.data.token);
            // לשגר לעמוד של רשימת המשתמשים
            nav("/admin/users")
          // console.log(resp.data)
        }
        catch (err) {
          console.log(err.response);
          alert("User or password worng, or service down");
        }
      }
    

    let emailRef = register("email", {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    })

    let passwordRef = register("password", { required: true, minLength: 3 });

    return (
        <div className='container'>
            <h1 className='text-center'>Log in to admin</h1>
            <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow mx-auto'>
                <label>Email:</label>
                <input {...emailRef} type="text" className='form-control' />
                {errors.email && <div className="text-danger">Enter valid email</div>}

                <label>Password:</label>
                <input {...passwordRef} type="text" className='form-control' />
                {errors.password && <div className="text-danger">Enter min 3 charts password</div>}
                <button className='btn btn-dark mt-3'>Log in to system</button>
            </form>
        </div>
    )
}
