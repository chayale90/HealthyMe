import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from "react-redux";


export default function MyInfo() {
  const { user } = useSelector((myStore) => myStore.userSlice);
  const [scale, setScale] = useState("");
  const [descreption, setDescreption] = useState("");

  const BMI = (user.weight / (user.height / 100 * user.height / 100)).toLocaleString()


  useEffect(() => {
    calculationBMI()
  }, [BMI])

  const calculationBMI = () => {
    if (BMI < 18.5) {
      setScale("Your weight is lower than desired")
      setDescreption("It is recommended to consume more calories per day, so that the body receives all the nutrients it needs.")
    }
    else if (BMI > 18.5 && BMI < 24.9) {
      setScale("Your weight is normal")
    }
    else if (BMI > 25 && BMI < 29.9) {
      setScale("Your weight is higher than desired ")
      setDescreption("This may be because your daily calorie intake is greater than the energy your body expends during the day.")
    }
  }



  return (
    <div className='container '>
      <div className='row text-center justify-content-center'>
        <div className='divCount py-4 mx-3'>{(user?.height) / 100}  <br /><span className='weight500'> Height</span> </div>
        <div className='divCount py-4 mx-3'>{user?.weight} <br /><span className='weight500'>KG</span> </div>
        <div className='divCount py-4 mx-3'>{BMI}<br /><span className='weight500'>BMI</span> </div>
      </div>
      {/* <div className='text-center mt-4'>Your BMI is {user?.BMI}</div> */}
      <div className='text-center mt-4'>{scale}</div>
      <div className='text-center mt-3 mb-4'>{descreption}</div>

    </div>
  )
}
