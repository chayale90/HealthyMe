import React from 'react'

export default function SignUpGeneral() {


    const nav = useNavigate()
    let { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const onSub = (bodyData) => {
        delete bodyData.password2
        console.log(bodyData);
        doApi(bodyData)
    }

    const doApiForm = async (bodyData) => {
        let url = API_URL + "/users"
        try {
            let resp = await doApiMethod(url, "POST", bodyData);
            if (resp.data) {
                toast.success("Welcome " + resp.data.name + " !");
                nav("/")
            }
        }
        catch (err) {
            console.log(err.response);
            toast.error("User or password worng, or service down");
        }
    }


    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSub)} className='col-12 col-md-4 p-3 shadow '>

                <label className='mt-2'>Name:</label>
                <input {...register('name', { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.name && <p className='text-danger'>Enter valid name</p>}

                <label className='mt-2'>Email:</label>
                <input {...register('email', { required: true, minLength: 2, pattern: regEmail })} type="text" className='form-control' />
                {errors.email && <p className='text-danger'>Enter valid email</p>}

                <label className='mt-2'>Password:</label>
                <input {...register('password', { required: true, minLength: 3, maxLength: 25 })} type="password" className='form-control' />
                {errors.password && <p className='text-danger'>Enter valid password</p>}

                <label className='mt-2'>Confirm password:</label>
                <input {...register('password2', { required: true, validate: (value) => { return value == getValues('password') } })} type="password" className='form-control' />
                {errors.password2 && <p className='text-danger'>Passwords not match</p>}

                <label className='mt-2'>hone:</label>
                <input {...register('phone', { required: true, minLength: 5, maxLength: 15 })} type="text" className='form-control' />
                {errors.phone && <p className='text-danger'>Enter Valid Phone</p>}

                <button className='mt-2 btn btn-primary'>Submit</button>

            </form>

        </div>
    )
}
