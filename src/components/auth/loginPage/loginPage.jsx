import React from 'react'
import Logo from '../../general_comps/logo'
import ImagesPosts from '../signUpComps/imagesPosts'
import Login from './login'


export default function LoginPage() {
    return (
        <React.Fragment>
            <div className='d-flex justify-content-lg-between justify-content-center'>
                <div className='col-9 col-sm-8 col-md-6 col-lg-5 col-xl-4'>
                    <div className='me-lg-3 ps-lg-5 ms-lg-5'>
                        <div className='d-flex justify-content-between'>
                            <Logo/>
                            <div className='d-lg-none d-block col-4'>
                                <ImagesPosts width={"100%"}/>
                            </div>
                        </div>

                        <Login/>
                    </div>
                </div>

                <div className='col-6 text-end d-lg-block d-none'>
                    <ImagesPosts width={"97%"} />
                </div>

            </div>
        </React.Fragment>
    )
}
