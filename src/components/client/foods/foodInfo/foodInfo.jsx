import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../../../services/apiService';

export default function FoodInfo() {
    const params = useParams()
    const [food, setFood] = useState({})
    const foodId = params["id"]

    useEffect(() => {
        doApiGetFoodInfo()
    }, [])

    const doApiGetFoodInfo = async () => {
        try {
            const url = API_URL + "/foods/foodInfo/" + foodId;
            const resp = await doApiGet(url);
            console.log(resp.data);
            setFood(resp.data)
        } catch (err) {
            console.log(err);
            toast.error("There problem try come back later");
        }
    };

    return (
        <div className='container mt-md-5 mt-4'>
            <div className='d-flex'>
                <div>
                    <img style={{ borderRadius: "12px" }} src={food.img_url} alt="foodImg" width={300} />
                </div>

                <div>
                    hfdhfdhsfh
                </div>

            </div>
        </div>
    )
}
