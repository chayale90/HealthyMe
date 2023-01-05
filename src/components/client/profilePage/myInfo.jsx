import React from 'react'
import { useSelector } from "react-redux";


export default function MyInfo() {
  const { user } = useSelector((myStore) => myStore.userSlice);

  return (
    <div className='container '>
      <div  className='row text-center justify-content-center'>
      <div className='divCount py-4 mx-3'>{user.height/100} <span className='weight500'> Height</span> </div>
      <div className='divCount py-4 mx-3'>{user.weight} <br/><span className='weight500'>KG</span> </div>
      <div className='divCount py-4 mx-3'>{user.weight / user.height * user.height} <br/><span className='weight500'>BMI</span> </div>
      </div>
    </div>
  )
}
