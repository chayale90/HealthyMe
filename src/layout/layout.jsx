import { ThemeProvider } from '@emotion/react'
import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { theme } from '../services/theme'
import Footer from './footer/footer'
import Header from './header/header'

export default function Layout() {

    //darkMode
    const { darkMode } = useSelector(myStore => myStore.homeSlice);
    const mode = useMemo(() => {
        if (darkMode)
            return theme.palette.darkMode.main
        return theme.palette.success.main
    }, [darkMode]);
    
    
    return (
            <div style={{ backgroundColor: mode }}>
                <Header />
                <Outlet />
                {/* <Footer /> */}
            </div>
    )
}
