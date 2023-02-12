//not used

import React, { useEffect, useState } from 'react'
import DialogFollowers from "../components/client/followers/dialogFollowers"

export default function useScrollFollowers(offsetY) {
    const [endScreen, setEndScreen] = useState(false);
    useEffect(() => {
        const div = document.getElementById("dialogFollowers");
        div.addEventListener("scroll", onScroll);
        // כמו מחזור componentwillunmount
        return () => {
            // יבטל את האזנה לאירוע כדי 
            // שלא יהיו כפילויות שעוברים בין דפים
            div.removeEventListener("scroll", onScroll);
        }
    }, [])

    const onScroll = () => {
        const div = document.getElementById("dialogFollowers");
        if (!div) return; // Add this check to prevent errors

        let divHeight = div.offsetHeight;
        let scrollTop = div.scrollTop;
        let docHeight = div.scrollHeight;

        // -offsetY to define the number of pixels before reaching the end 
        // of the page to display it has already reached the end
        if (Math.ceil(divHeight + scrollTop) >= docHeight - offsetY) {
           console.log("bhb");
            setEndScreen(true)
        }   
    }

    const endScreenFalse = () => {
        setEndScreen(false)
    }
    return [endScreen, endScreenFalse];
}
