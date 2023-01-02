import React from 'react'
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
export default function SearchInput() {
    const inputRef = useRef();
    const paperRef = useRef();

    const handleFocus = () => {
        paperRef.current.style.borderColor = '#A435F0';
    };
    const handleBlur = () => {
        paperRef.current.style.borderColor = '#DCDCDC';
    };
    const handleSubmit = () => {
        console.log(inputRef.current?.value)
    };
    const handleChange = (e) => {
        console.log(e.target.value)
    };
    const handleKeyDown = (e) => {
        console.log(e.target.value)
    };

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
