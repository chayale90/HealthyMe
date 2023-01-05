import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import MyInfo from './myInfo';
import Posts from './postsList';

export default function NavBarMyProfile() {
    const [values, setValues] = useState({ button1: '#CCCCCC', button2: '#A435F0' });
    const [showPosts, setShowPosts] = useState("none")
    const [showInfo, setShowInfo] = useState("block")
    return (
        <div className='container mt-5 pt-sm-5 '>
            <div className='row mx-auto mb-5'>
                <div className='col-6 '>
                    <div style={{ position: 'absolute', background: values.button1, minHeight: '2px', width: "50%" }} ></div>
                    <div>
                        <Link
                            className='weight500'
                            onClick={() => {
                                setValues({
                                    button1: "#A435F0",
                                    button2: "#CCCCCC",
                                });
                                setShowPosts("block")
                                setShowInfo("none")
                            }}
                            style={{ color: values.button1, display: 'flex', justifyContent: "center", paddingTop: "21px", textDecoration: "none" }}>
                            Posts
                        </Link>
                    </div>
                </div>

                <div className='col-6 '>
                    <div style={{ width: "45%", position: 'absolute', background: values.button2, minHeight: '2px' }} ></div>
                    <div>
                        <Link
                            className='weight500'
                            onClick={() => {
                                setValues({
                                    button2: "#A435F0",
                                    button1: "#CCCCCC",
                                });
                                setShowPosts("none")
                                setShowInfo("block")
                            }}
                            style={{ color: values.button2, display: 'flex', justifyContent: "center", paddingTop: "21px", textDecoration: "none" }}>
                            My Personal info
                        </Link>
                    </div>
                </div>

            </div>

            <div style={{ display: showPosts }}><Posts /></div>
            <div style={{ display: showInfo }}><MyInfo /></div>


        </div>
    )
}
