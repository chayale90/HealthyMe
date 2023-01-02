import React, { useState,useRef,useEffect } from 'react'
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../../services/apiService';

export default function SearchInput() {
    const inputRef = useRef();
    const paperRef = useRef();
    const [search, setSearch] = useState("");
    const [arSearch, setArSearch] = useState([]);

    useEffect(() => {
        doApiSearch()
    }, [search])

    const handleFocus = () => {
        paperRef.current.style.borderColor = '#A435F0';
    };
    const handleBlur = () => {
        paperRef.current.style.borderColor = '#DCDCDC';
    };
    const handleSubmit = () => {
       setSearch(inputRef.current?.value)
    };
    const handleChange = (e) => {
       setSearch(e.target.value)
    };
    const handleKeyDown = (e) => {
       setSearch(e.target.value)
    };


    const doApiSearch = async () => {
        let url = API_URL + `/foods/search?s=`+search;
        try {
            const resp = await doApiGet(url);
            console.log(resp.data);
            setArSearch([...resp.data])
        }
        catch (err) {
            console.log(err);
            toast.error("there problem ,try again later")
        }
    }

    return (
        <div className='row justify-content-center'>
            <div className='mx-auto col-10 col-md-8 col-lg-5  mb-5 pb-sm-4 mt-4'>
                <Paper ref={paperRef}
                    elevation={0}
                    sx={{ border: "1px solid #DCDCDC", "&:hover": { border: "1px solid gray" }, p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: 100 }}
                >
                    <InputBase
                        inputRef={inputRef}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'Search my food' }}
                    />
                    <IconButton
                        onClick={handleSubmit}
                        sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
        </div>
    )
}
