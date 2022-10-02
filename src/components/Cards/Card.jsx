import React from 'react'
import Card from '@mui/material/Card';
import "./Card.css"
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

const card = (props) => {
  return (
    <>
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

  
          </>
  )
}

export default card