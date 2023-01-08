import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import MyDetails from './myDetails';
import Posts from './postsList';

export default function NavBarMyProfile({setShowPosts,showPosts,values,setValues,clickOnPosts,setShowInfo,showInfo}) {
    
    return (
        <div className='container mt-5 pt-sm-5 '>
            <div className='row mx-auto mb-5'>

                <div className='col-6 p-0'>
                    <div className='col' style={{ width: "100%",  background: values.button2, minHeight: '2px' }} ></div>
                    <div>
                        <div
                            className='weight500'
                            onClick={() => {
                                setValues({
                                    button2: "#A435F0",
                                    button1: "#CCCCCC",
                                });
                                setShowPosts("none")
                                setShowInfo("block")
                            }}
                            style={{ color: values.button2, display: 'flex', justifyContent: "center", paddingTop: "21px", textDecoration: "none",cursor:"pointer" }}>
                            My Personal info
                        </div>
                    </div>
                </div>

                <div className='col-6 p-0'>
                    <div  style={{  background: values.button1, minHeight: '2px', width: "100%" }} ></div>
                    <div>
                        <div
                            className='weight500'
                            onClick={()=>{
                                clickOnPosts()
                            }}
                            style={{ color: values.button1, display: 'flex', justifyContent: "center", paddingTop: "21px", textDecoration: "none" ,cursor:"pointer" }}>
                            Posts
                        </div>
                    </div>
                </div>

            </div>

            <div style={{ display: showPosts }}><Posts /></div>
            <div style={{ display: showInfo }}><MyDetails /></div>


        </div>
    )
}
