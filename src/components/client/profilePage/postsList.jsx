import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../../services/apiService'
import PostItem from './postItem';

export default function PostsList() {

    const [ar, setAr] = useState([]);

    useEffect(() => {
        doApiMyFoods()
    }, [])

    const doApiMyFoods = async () => {
        let url = API_URL + "/foods/myFoods"
        try {
            let resp = await doApiGet(url);
            setAr(resp.data)
            console.log(resp.data);
        }
        catch (err) {
            console.log(err);
            toast.error("there problem, try later")
        }
    }

    return (
        <div>

            <div className='row justify-content-center'>
                {ar.map((item, i) => {
                    return (
                        <PostItem key={item._id} index={i} item={item}  />
                    )
                })}
            </div>

        </div>
    )
}
