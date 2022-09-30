import "./Find.css"
import react, { useState } from "react";
import axios from 'axios';
import Card from "../Cards/Card.jsx"
function Find() {
  const [name, setname] = useState("");
  const [date,setdate] =useState(null)
  const [isdata,setisdata] = useState(false);
  const [reald,setreald] = useState({});
  const [realdstatus,setrealdstatus] = useState(false);
    
  const handl = (e) => {
    e.preventDefault();
    console.log(name)

    try {
      axios.post("http://localhost:5000/getusers", {
        name
      }).then((x) => {
        setisdata(!isdata);
        if(x.data.data.length === 0){
          setreald([]);
          setrealdstatus(true);
        }else if(x.data.data.length>0){
      setreald(x.data.data[0].orders);-
      setrealdstatus(false);
    }
      })
    } catch (error) {
      console.log(error)
    }
  }  
  const hand = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:5000/getdate", {
        date
      }).then((x) => {
        console.log(x);
      })
    } catch (error) {
      console.log(error)
    }
  }     
  console.log(name)
  return (
    <div>
      <div className='box'>
      <h1>Hey User</h1>
      <hr></hr>
      <p>You can search for orders of owner by their first name or order date</p>
      <form onSubmit={handl}>
        <input type="text"
          onChange={(e) => {
            setname(e.target.value);
          }}
          placeholder='Enter first name of spotlight users'
          value={name}></input>
        <button type="submit">GO</button>
      </form>
      <form onSubmit={hand}>
        <input type="date" onChange={(e)=>{setdate(e.target.value)}}></input>
        <button type="submit">GO</button>
      </form>
      
    </div>
      {realdstatus ? 
        <h1>No Users Found</h1>
      : 
        
          isdata  ?
          <div>
          <p>Ordered by {name}</p>
           <div className="boxx"> 
           {
            reald.map(el =>{
              return (
              <Card 
              listid ={el.list}
              amount = {el.amount}
              dat = {el.date}
              />
              )
    
            })
          }
          </div>
         
          </div> : null}
     
    
    </div>
   
  )
}

export default Find