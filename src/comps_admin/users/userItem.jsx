import React from 'react'

export default function UserItem(props) {
    let item = props.item;


    const onRoleClick = async () => {
        let bodyData;




    }








    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.sex}</td>
            <td>{item.height}</td>
            <td>{item.weight}</td>
            <td>{item.role}</td>
            <td>{item.rank}</td>
            <td>{item.score}</td>
            <td>{<img src={item.img_url} alt="Avatar" width={60} />}</td>
            <td>{item.nickname}</td>
            <td>{String(item.active)}</td>
            <td>
                <button className='badge bg-danger'>Del</button>
            </td>


        </tr>
    )
}
