import "./Find.css"
import react, { useState } from "react";
import axios from 'axios';
import Card from "../Cards/Card.jsx"
function Find() {
  const [name, setname] = useState("");
  const [isdata,setisdata] = useState(false);
  const [reald,setreald] = useState({});
  const [realdstatus,setrealdstatus] = useState(false);
     // useEffect(() => {
  //   axios.get("http://localhost:5000/get").then((response) => {
  //    console.log(response);
  //   })
  // }, [])
  const handle = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:5000/get", {
        name
      }).then((x) => {
        setisdata(!isdata);
        if(x.data.data.length === 0){
          setreald([]);
          console.log("HERe");
          setrealdstatus(true);
        }else if(x.data.data.length>0){
      setreald(x.data.data[0].orders);
      setrealdstatus(false);
    }
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
      <form onSubmit={handle}>
        <input type="text"
          onChange={(e) => {
            setname(e.target.value);
          }}
          placeholder='Enter first name of spotlight users'></input>
        <button>GO</button>
      </form>
      <form >
        <input type="date" placeholder='Enter date'></input>
        <button>GO</button>
      </form>
      
    </div>
      {realdstatus ? 
        <h1>No Users Found</h1>
      : 
        
          isdata  ?
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
         
          </div> : null}
     
    
    </div>
   
  )
}

export default Find