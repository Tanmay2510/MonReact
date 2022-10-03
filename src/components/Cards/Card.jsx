import React, { useState } from 'react'
import "./Card.css"

const card = (props) => {
  return (
    <div className='fl'>
     <h2> User Order history </h2>
      <ul type = "disc">
      <li>Order id :{props.listid}
      </li>
      <li>Amount :{props.amount}
      </li>
      <li>Date of Order :{props.dat}
      </li>
      </ul>
    {
      props.name? 
    <h2 >Ordered by { props.name }</h2>
      :null
    }
  </div>

  
  )
}

export default card