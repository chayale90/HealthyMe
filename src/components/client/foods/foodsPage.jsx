import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../../services/apiService';
import FoodsList from './foodsList'
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import SearchInput from './searchInput';
import { useNavigate } from 'react-router-dom';

export default function FoodsPage() {
  const nav = useNavigate()
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [arCats, setArCats] = useState([])
  console.log(sort);


  const options = [
    { value: 'salads', label: 'Salads' },
    { value: 'shakes', label: 'Shakes' },
    { value: 'breakFast', label: 'BreakFast' },
    { value: 'mainMeal', label: 'MainMeal' },
    { value: 'quickMeal', label: 'QuickMeal' },
    { value: 'All', label: 'All' }
  ];
  const optionsSort = [
    { value: 'calories', label: 'Calories' },
    { value: 'dishes', label: 'Dishes' },
    { value: 'likes', label: 'Likes' }
  ];

  useEffect(() => {
    doApiCats()
  }, [category])

  const doApiCats = async () => {
    let url = API_URL + `/foods/category/${category}`;
    try {
      const resp = await doApiGet(url);
      console.log(resp.data);
      setArCats([...resp.data])
      console.log(category);
    }
    catch (err) {
      console.log(err);
      toast.error("there problem ,try again later")
    }
  }

  return (
    <div className='container '>

      <SearchInput />

      <div className='row justify-content-center justify-content-md-between mx-sm-3 mx-xs-5 px-md-3 mx-lg-5 px-lg-5 mb-5'>
        <div className='col-7 col-md-6 col-lg-5 col-xl-4'>
          <Select
            theme={(theme) => ({
              ...theme,
              borderRadius: "5px",
              colors: {
                ...theme.colors,
                // primary25: 'grey',
                primary: '#A435F0',
              },
            })}
            className="basic-single"
            classNamePrefix="select"
            defaultValue={options[6]}
            placeholder="Category"
            options={options}
            onChange={(e) => setCategory(e.value)}
          />
        </div>

        <div className='col-5 col-md-4 col-lg-3'>
          <Select
            theme={(theme) => ({
              ...theme,
              borderRadius: "5px",
              colors: {
                ...theme.colors,
                // primary25: 'grey',
                primary: '#A435F0',
              },
            })}
            className="basic-single"
            classNamePrefix="select"
            // defaultValue={optionsSort[2]}
            placeholder="Sort By"
            options={optionsSort}
            onChange={(e) => setSort(e.value)}
          />
        </div>
      </div>

      <FoodsList arCats={arCats} sort={sort} />

      <Fab
        sx={{ background: "#A435F0", color: "white", "&:hover": { color: "white", background: "#912CD6" }, position: 'sticky', bottom: 70, left: 1900 }}
        onClick={() => { nav("/addFood") }}
        aria-label="addFood">
        <AddIcon />
      </Fab>
    </div >
  )
}
