import { ThemeProvider } from '@emotion/react'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { theme } from '../services/theme'
import Footer from './footer/footer'
import Header from './header/header'

export default function Layout() {

    const { darkMode } = useSelector(myStore => myStore.homeSlice);

    const mode = React.useMemo(() => {
        if (darkMode == true) {
            return theme.palette.darkMode.main
        } else if (darkMode == false ) {
            return theme.palette.success.main
        }
      }, [darkMode]);
    
    
    return (
            <div style={{ backgroundColor: mode }}>
                <Header />
                <Outlet />
                {/* <Footer /> */}
            </div>
    )
}
