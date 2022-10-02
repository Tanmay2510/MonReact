import React from 'react'
import "./Card.css"

const card = (props) => {
  return (
    <div>
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
    
    
  </div>

  
          </div>
  )
}

export default card