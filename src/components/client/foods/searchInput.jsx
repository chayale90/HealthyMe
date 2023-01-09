import React, { useState, useRef, useEffect } from 'react'
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { setArSearch } from "../../../features/foodsSlice"


export default function SearchInput() {
    const { arSearch } = useSelector(myStore => myStore.foodsSlice)
    const inputRef = useRef();
    const paperRef = useRef();
    const [search, setSearch] = useState("");
    // const [arSearch, setArSearch] = useState([]);
    const dispatch = useDispatch();

    const [showDiv, setShowDiv] = useState("none");

    useEffect(() => {
        doApiSearch()
    }, [search])

    console.log(search);

    const handleFocus = () => {
        paperRef.current.style.borderColor = '#A435F0';
        setShowDiv("block")
    };
    const handleBlur = () => {
        paperRef.current.style.borderColor = '#DCDCDC';
        setShowDiv("none")
    };
    const handleSubmit = () => {
        // nav('/foods?search=' + inputRef.current.value)
        setSearch(inputRef.current.value)
    };
    const handleChange = (e) => {
        // setSearch(e.target.value)
    };
    const handleKeyDown = (e) => {
        if (e.key == "Enter") {
            setSearch(e.target.value)
        }
        // nav('/foods?search' + e.target.value)
    };


    const doApiSearch = async () => {
        // /foods/search?s=
        // let search = querys.get("search");
        let url = API_URL + `/foods/search?s=` + search;
        try {
            const resp = await doApiGet(url);
            console.log(resp.data);
            dispatch(setArSearch({ val: resp.data }))
            console.log(arSearch);
        }
        catch (err) {
            console.log(err);
            toast.error("there problem ,try again later")
        }
    }

    return (
        <div className='row justify-content-center'>
            <div style={{ minHeight: "120px" }} className='mx-auto col-10 col-md-8 col-lg-5  pb-sm-4 mt-4'>
                <Paper ref={paperRef}
                    elevation={0}
                    sx={{ border: "1px solid #DCDCDC", "&:hover": { border: "1px solid gray" }, p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: 100,boxShadow: "0px 0px 10px -4px rgba(0, 0, 0, 0.16)" }}
                >
                    <IconButton
                        onClick={handleSubmit}
                        sx={{ p: '10px', color: '#A435F0' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        inputRef={inputRef}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'Search my food' }}
                    />
                </Paper>
                <div style={{ display: showDiv }} className='s14 purple text-center '>Search by name, description, category and ingredient...</div>
            </div>
        </div>
    )
}
