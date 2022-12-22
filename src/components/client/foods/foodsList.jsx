import { Fab } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../../services/apiService';
import CheckUserComp from '../../auth/checkComps/checkUserComp';
import FoodItem from './foodItem'
import AddIcon from '@mui/icons-material/Add';
import { useSearchParams } from 'react-router-dom';

export default function FoodsList() {
  const [ar, setAr] = useState([]);
  // const [querys] = useSearchParams();

  useEffect(() => {
    doApi()
  }, [])

  const doApi = async () => {
    //?page= 
    // let page = querys.get("page") || 1;

    let url = API_URL + "/foods/";
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
    <div className='container mt-4'>
      <CheckUserComp />
      <div className='row justify-content-center'>

        {ar.map((item, i) => {
          return (
            <FoodItem key={item._id} index={i} item={item} doApi={doApi}/>
          )
        })}
        {ar.length < 1 && <h2 className='display-6 text-center'>Loading...</h2>}

      </div>


      <Fab
        sx={{ background: "#A435F0", color: "white", "&:hover": { color: "white", background: "#912CD6" }, position: 'sticky', bottom: 70 ,left:1900}}
        aria-label="add">
        <AddIcon />
      </Fab>


    </div>

  )
}
