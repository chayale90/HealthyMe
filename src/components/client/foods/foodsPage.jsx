// 3rd library
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { CircularProgress, ThemeProvider } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
// project imports
import FoodsList from "./foodsList";
import SearchInput from "./searchInput";
import { API_URL, doApiGet } from "../../../services/apiService";
import { setArSearch } from "../../../features/foodsSlice";
import { changeHome } from "../../../features/featuresSlice"
import { theme } from '../../../services/theme';
import FabComp from '../../../services/fabComp';

const options = [
  { value: "salads", label: "Salads" },
  { value: "shakes", label: "Shakes" },
  { value: "breakFast", label: "BreakFast" },
  { value: "mainMeal", label: "MainMeal" },
  { value: "quickMeal", label: "QuickMeal" },
  { value: "", label: "No Category" }
];

const optionsSort = [
  { value: "calories", label: "Calories" },
  { value: "dishes", label: "Dishes" },
  { value: "totalPrepMinutes", label: "Time" },
  { value: "", label: "No Sort" }
];


export default function FoodsPage() {
  const nav = useNavigate()
  const [sort, setSort] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const { arSearch } = useSelector((myStore) => myStore.foodsSlice);
  const dispatch = useDispatch();
  const [displayProgress, setDisplayProgress] = useState("none");

  const [searchQueries, setSearchQueries] = useState({
    page: 1,
    searchTerm: null,
    categoryTerm: null,
    sort: null
  });

  useEffect(() => {
    dispatch(changeHome({ val: "block" }))
    fetchFoodData(searchQueries);
    return () => {
      dispatch(changeHome({ val: "none" }))
    }
  }, []);

  const resetSearchResults = () => {
    dispatch(setArSearch({ val: [] }));
  };

  const handleSearchInput = (value) => {
    const tempSearchQueries = {
      page: 1,
      searchTerm: value,
      categoryTerm: null,
      sort: null
    };
    console.log({ value, tempSearchQueries });
    setSearchQueries({
      ...searchQueries,
      ...tempSearchQueries,
    });
    fetchFoodData(tempSearchQueries);
  };
  const handleSetCategory = (event) => {
    const tempSearchQueries = {
      page: 1,
      searchTerm: null,
      categoryTerm: event.value,
      sort: null
    };
    setSearchQueries({
      ...searchQueries,
      ...tempSearchQueries,
    });
    fetchFoodData(tempSearchQueries);
  };

  const handleSetSort = (event) => {
    const tempSearchQueries = {
      page: 1,
      searchTerm: null,
      categoryTerm: null,
      sort: event.value
    };
    setSearchQueries({
      ...searchQueries,
      ...tempSearchQueries,
    });
    fetchFoodData(tempSearchQueries);
  };

  const fetchFoodData = async (data) => {

    const { page, searchTerm, categoryTerm } = searchQueries; // TODO: to use it after
    let url = API_URL + `/foods`;
    const params = {
      page: data.page,
      searchTerm: data.searchTerm,
      categoryTerm: data.categoryTerm,
      sort: data.sort,
    };
    // console.log({ params });
    setDisplayProgress("flex")
    try {
      let resp = await doApiGet(url, params);
      const respData =
        data.page === 1
          ? { val: [...resp.data.data] }
          : { val: [...arSearch, ...resp.data.data] };
      // console.log({ respData, page });
      dispatch(setArSearch({ ...respData }));
      setSearchQueries((prevState) => ({ ...prevState, page: prevState.page + 1 }));
      setTotalPages(resp.data.totalPages);
      setDisplayProgress("none")

    } catch (err) {
      console.log(err);
      toast.error("there problem ,try again later");
      setDisplayProgress("none")

    }
  };

  const loadMore = () => {
    fetchFoodData(searchQueries);
  };

  const hasMore = searchQueries.page <= Math.ceil(totalPages);
  // console.log({ searchQueries, totalPages, hasMore });
  return (

    <div id="food-page-scroll-container" className="container">
      <ThemeProvider theme={theme}>

        <SearchInput handleSearchInput={handleSearchInput} />
        <div className="row justify-content-center justify-content-md-between mx-sm-3 mx-xs-5 px-md-3 mx-lg-5 px-lg-5 mb-5">
          <div className="col-7 col-md-6 col-lg-5 col-xl-4">
            <Select
              theme={(theme) => ({
                ...theme,
                borderRadius: "5px",
                colors: {
                  ...theme.colors,
                  // primary25: 'grey',
                  primary: "#A435F0",
                },
              })}
              className="basic-single"
              classNamePrefix="select"
              defaultValue={options[6]}
              placeholder="Category"
              options={options}
              onChange={handleSetCategory}
            />
          </div>

          <div className="col-5 col-md-4 col-lg-3">
            <Select
              theme={(theme) => ({
                ...theme,
                borderRadius: "5px",
                colors: {
                  ...theme.colors,
                  // primary25: 'grey',
                  primary: "#A435F0",
                },
              })}
              className="basic-single"
              classNamePrefix="select"
              // defaultValue={optionsSort[2]}
              placeholder="Sort By"
              options={optionsSort}
              onChange={handleSetSort}
            />
          </div>
        </div>


        <FoodsList sort={sort} />


        {hasMore &&
          <div style={{ display: "flex" }}>
            <div style={{ margin: "0 auto" }} >
              <Button style={{ color: '#A435F0', border: '#A435F0 1px solid' }}
                variant="outlined"
                onClick={loadMore}
                endIcon={<CircularProgress sx={{ display: displayProgress }} size={"20px"} color="primary" />}
              >
                Load More
              </Button>
            </div>
          </div>
        }

        <FabComp />

      </ThemeProvider>
    </div>
  );
}