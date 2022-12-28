import React, { useState } from 'react'
import { useEffect } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../../services/apiService';
import FoodsList from './foodsList'
import AddIcon from '@mui/icons-material/Add';
import { Fab, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function FoodsPage() {
  const [category, setCategory] = useState({});
  const [data, setData] = useState([])

  const options = [
    { value: 'salads', label: 'Salads' },
    { value: 'shakes', label: 'Shakes' },
    { value: 'breakFast', label: 'BreakFast' },
    { value: 'mainMeal', label: 'MainMeal' },
    { value: 'quickMeal', label: 'QuickMeal' },
    { value: 'All', label: 'All' }
  ];

  useEffect(() => {
    doApi()
  }, [category])

  const doApi = async () => {
    let url = API_URL + "/foods/category/" + category;
    try {
      const resp = await doApiGet(url);
      console.log(resp.data);
      setData([...resp.data])
      console.log(category);
    }
    catch (err) {
      console.log(err);
      toast.error("there problem ,try again later")
    }
  }

  return (
    <div className='container '>
      <div className='row justify-content-center'>
        <div className='mx-auto col-10 col-md-8 col-lg-5  mb-5 pb-sm-4 mt-4'>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: 100 }}
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'Search my food' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

        </div>
      </div>


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
            defaultValue={options[6]}
            placeholder="Sort By"
            options={options}
            onChange={(e) => setCategory(e.value)}
          />
        </div>
      </div>





      <FoodsList dataCat={data} />

      <Fab
        sx={{ background: "#A435F0", color: "white", "&:hover": { color: "white", background: "#912CD6" }, position: 'sticky', bottom: 70, left: 1900 }}
        aria-label="add">
        <AddIcon />
      </Fab>
    </div >
  )
}
