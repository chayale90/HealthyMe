import React from 'react'

export default function FoodItem(props) {

  let item = props.item





  return (

    <div style={{ minHeight: "300px" }} className='col-4 border pt-2'>
      <img src={item.img_url} width={"100%"} />
      <div className='s14'>{item.name}</div>
      <div className='s14'>{item.likes.length} likes</div>
      item
    </div>
  )


}
