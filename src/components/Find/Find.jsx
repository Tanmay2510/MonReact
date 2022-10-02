import "./Find.css"
import react, { useState } from "react";
import axios from 'axios';
import Card from "../Cards/Card.jsx"
function Find() {
  const [name, setname] = useState("");
  const [date,setdate] =useState(null)
  const [isdata,setisdata] = useState(false);
  const [isdatacal,setisdatacal] = useState(false)
  const [reald,setreald] = useState({});
  const [realdstatus,setrealdstatus] = useState(false);
  const [dateobj,setdateobj] = useState([])
  const handl = (e) => {
    e.preventDefault();
    try {
      axios.get("http://localhost:5000/getusers/"+name).then((x) => {
        setisdata(!isdata);
        console.log(x.data);
        if(x.data === 0){
          setreald([]);
          setrealdstatus(true);
          setisdatacal(false);
        }else if(x.data.length>0){
      setreald(x.data[0].orders);
      setrealdstatus(false);
    }
      })
    } catch (error) {
      console.log(error)
    }
  }  
  const hand = (e) => {
    console.log(date)
    e.preventDefault();
    try {
      axios.get("http://localhost:5000/getdate/"+date).then((x) => {
          x.data.dat.map((e,k)=>{
            e.orders.map((ford,kk)=>{
                let ct = (ford.date).toString().substring(10)
                let comp = date+ct;
                if(ford.date == comp){
                  // e.orders.map(el=>{
                  //   return (
                  //     <Card 
                  //     listid ={el.list}
                  //     amount = {el.amount}
                  //     dat = {el.date}
                  //     />
                  //   )
                  // })
                }
                
            })
         })
         setisdatacal(true);
        
        
      })
    } catch (error) {
      console.log(error)
    }
  }
 
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
    <Card />
    </div>
   
  )
}

export default Find

// {
//   isdatacal ?
//   <div>
//   <p>Ordered by {dateobj.ename}</p>
//    <div className="boxx"> 
//    {
//     dateobj.arr.map(el =>{
//       return (
//       <Card 
//       listid ={el.list}
//       amount = {el.amount}
//       dat = {el.date}
//       />
//       )
//     })
//   }
//   </div>
//   </div>
//   : null
// }