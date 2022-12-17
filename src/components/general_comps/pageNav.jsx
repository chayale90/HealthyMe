import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { doApiGet } from '../../services/apiService';

export default function PageNav(props) {

    const [pages, setPages] = useState(0)

    useEffect(() => {
        doApi();
    }, [])


    const doApi = async () => {
        let url = props.urlPageApi;
        let resp = await doApiGet(url);
        let totalPages = Math.ceil(resp.data.count / props.perPage)
        setPages(totalPages)
    }

    return (
        <div className='text-start'>
            <span>Page:</span>
            {[...Array(pages)].map((item, i) => {
                return (
                    <Link to={props.navToDir + (i + 1)} className={props.cssClass} key={i}>{i+1}</Link>
                )
            })}

        </div>
    )
}
