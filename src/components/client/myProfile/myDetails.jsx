import React, { Component, useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from "react-redux";
import ChartJsMyWeight from './graph/ChartJsMyWeight';


export default function MyDetails() {
  const { user } = useSelector((myStore) => myStore.userSlice);
  const [scale, setScale] = useState("");
  const [descreption, setDescreption] = useState("");

  const BMI =(user?.weight && user.weight.length > 0)? ((user.weight[user.weight.length-1].myWeight) / (user.height / 100 * user.height / 100)).toLocaleString():""

  useEffect(() => {
    if(BMI)
    console.log(BMI);
    calculationBMI()
  }, [BMI])

  const calculationBMI = () => {
    if (BMI < 18.5) {
      setScale("Your weight is lower than desired")
      setDescreption("It is recommended to consume more calories per day, so that the body receives all the nutrients it needs.")
    }
    else if (BMI >= 18.5 && BMI < 24.9) {
      setScale("Your weight is normal")
      setDescreption("It is important to note: a BMI between 18.5 and 20 is not normal for many. If such a result was obtained - professional advice should be sought.")
    }
    else if (BMI > 24.9 && BMI < 29.9) {
      setScale("Your weight is higher than desired ")
      setDescreption("This may be because your daily calorie intake is greater than the energy your body expends during the day.")
    }
    else if (BMI >= 29.9) {
      setScale("Your weight is significantly higher than desired. ")
      setDescreption("The reason for this may be that your daily caloric intake is very large in relation to the energy your body expends during the day.")
    }
  }
  
  return (
    <div className='container'>
      <div className='row text-center justify-content-around justify-content-sm-center'>
        <div className='divCount py-4 mx-sm-4'>{(user?.height) / 100}  <br /><span className='weight500'> Height</span> </div>
        <div className='divCount py-4 mx-sm-4'>{(user?.weight && user.weight.length > 0)?user.weight[user.weight.length-1].myWeight:""} <br /><span className='weight500'>KG</span> </div>
        <div className='divCount py-4 mx-sm-4'>{(user?.weight && user.weight.length > 0) ? BMI : 'N/A'}<br /><span className='weight500'>BMI</span> </div>
      </div>
      
      {/* <div className='text-center mt-4'>Your BMI is {user?.BMI}</div> */}

      <div className='text-center mt-4'>{scale}</div>
      <div className='text-center mt-3 mb-4 '>{descreption}</div>

      <div className='pb-5'>
        <ChartJsMyWeight />
      </div>

    </div>
  )
}
