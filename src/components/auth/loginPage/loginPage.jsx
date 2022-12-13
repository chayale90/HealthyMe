import React from 'react'
import Logo from '../../general_comps/logo'
import ImagesPosts from '../signUpComps/imagesPosts'
import Login from './login'


export default function LoginPage() {
    return (
        <React.Fragment>
            <div className='d-flex justify-content-around'>
                <div className='col-lg-5 col-xl-4 col-md-6'>
                    <Logo />
                    <div className='ms-5 pe-xl-3 mt-4 ps-5 align-items-center' >
                        <Login />
                    </div>
                </div>

                <div className='col-6 text-end d-lg-block d-none'>
                    <ImagesPosts />
                </div>

            </div>
        </React.Fragment>
    )
}
