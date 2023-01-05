import React from 'react'
import "./myProfilePage.css"
export default function PostItem({ item }) {
    return (
            <div className=' p-0 col-4 imgPost'>
                <div className='overflow-hidden h-100'>
                <img className='w-100 img imgFoodPost' src={item.img_url} width="200px" alt="imgFood"/>
                </div>
            </div>

    )
}
