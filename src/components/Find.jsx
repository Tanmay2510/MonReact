import "./Find.css"
import react, { useState, useEffect } from "react";
import axios from 'axios';
function Find() {
  const [name, setname] = useState("");
  const [isdata,setisdata] = useState(false);
  // useEffect(() => {
  //   axios.get("http://localhost:5000/get").then((response) => {
  //    console.log(response);
  //   })
  // }, [])

  const handle = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:5000/getusers", {
        name
      }).then((x) => {
        setisdata(!isdata);
        console.log(x); 
        if(x.data.data.length === 0){
          console.log("NO user");
        }else{
          x.data.data.map(el,i =>{
            console.log(el);
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
    {
      isdata  ? <div className="box">
       <h1>f</h1>
      </div> :  
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
    }
    </div>
   
  )
}

export default Find