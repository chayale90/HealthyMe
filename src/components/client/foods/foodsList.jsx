import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../../services/apiService';
import UserInfo from '../../../services/userInfo';
import FoodItem from './foodItem'

export default function FoodsList() {
  const [ar, setAr] = useState([]);

  useEffect(() => {
    doApi()
  }, [])

  const doApi = async () => {
    //?page= 
    // let page = querys.get("page") || 1;
    let url = API_URL + "/foods"
    // /?page= + page;
    try {
      let { data } = await doApiGet(url);
      setAr(data);
      console.log(data);
    }
    catch (err) {
      console.log(err);
      toast.error("there problem ,try again later")
    }
  }


  return (
    <div className='container-fluid'>
      <UserInfo />
      <div className='container'>
        <div className='row p-2 border'>

          {ar.map((item, i) => {
            return (
              <FoodItem key={item._id} index={i} item={item} />
            )
          })}

        </div>
      </div>
    </div>
  )
}
