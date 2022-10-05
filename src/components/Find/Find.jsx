import "./Find.css"
import react, { useState , useEffect } from "react";
import axios from 'axios';
import Card from "../Cards/Card.jsx"

function Find() {
  const [name, setname] = useState("");
  const [date, setdate] = useState(null)
  const [isdata, setisdata] = useState(false);
  const [isdatacal, setisdatacal] = useState(true)
  const [reald, setreald] = useState({});
  const [realdd, setrealdd] = useState({});
  const [iscalval, setiscalval] = useState(false);  
  const [realdstatus, setrealdstatus] = useState(false);
  const [thea,setthea] = useState([]);
  const [distp,setdisp] = useState(false);
  const [isf,setisf] = useState(false);

  const handl = (e) => {
    try {
      axios.get("http://localhost:5000/getusers/" + name).then((x) => {
        setisdata(true);
        if (x.data.length === 0) {
          setreald([]);
          setrealdstatus(!realdstatus);
        } else if (x.data.length > 0) {
          setreald(x.data[0].orders);
          setrealdstatus(false);
        }
      })
    } catch (error) {
      console.log(error)
    }
    e.preventDefault();
  }
  let a = [];
  const hand = (e) => {
    e.preventDefault();
    try {
      axios.get("http://localhost:5000/getdate/" + date).then((x) => {
        if (x.data.dat.length === 0) {
          setiscalval(true)
        } else if (x.data.dat.length > 0) {
          x.data.dat.map(el => {
            el.orders.map(finaldate=>{
               if(finaldate.date.substring(0,10) == date){
                console.log(el.firstName)
                const ne = {
                  name:el.firstName,
                  arr:finaldate
                }
                a.push(ne)
                setrealdd(a)
               }
            })
            setiscalval(false)
          })
        }
        setisdatacal(false);
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
      try {
          axios.get("http://localhost:5000/search").then(x=>{
            setthea(x.data.data);
          })
      } catch (error) {
        console.log(error)
      }
  },[])
  let newname = [];
  thea.map(l=>{
    if(l.toLowerCase().indexOf(name.toLowerCase())>-1){
      newname.push(l)
    }
  })
  return (
    <div>
      <div className='box'>
        <h1>Hey User</h1>
        <hr></hr>
        <p>You can search for orders of owner by their first name or order date</p>
        <form onSubmit={handl}>
        <div>
          <input type="text"
            onFocus={()=>setdisp(true)}
            // onBlur={()=>setdisp(false)}
            onChange={(e) => {
              setname(e.target.value);
            }}
            placeholder='Enter first name of spotlight users'
            value={name}/>
          {
            distp &&
              newname.map(thename=>{
                return(
                  <div onClick={()=>setname(thename)} >{thename}</div>
                )
              })
          }
        </div>
        </form>
        <form onSubmit={hand}>
          <input type="date" onChange={(e) => { setdate(e.target.value) }}
            value={date}></input>
        </form>
      </div>
      {realdstatus ? <p>No user found(by name search)</p> : isdata ?
        <div>
          <p>Ordered by {name}</p>
          <div className="boxx">
            {
              reald.map(el => {
                return (
                  <Card
                    listid={el.list}
                    amount={el.amount}
                    dat={el.date}
                  />
                )
              })
            }
          </div>
        </div> : null}


      {
        iscalval ? <p>No user found(by date search)</p> :
          isdatacal ? null :
            <div>
              <p>Filter by date {date}</p>
              <div className="boxx" >
                {
                  realdd.map((dateobj) => {
                   return(
                    <Card
                    listid={dateobj.arr.list}
                    amount={dateobj.arr.amount}
                    dat={dateobj.arr.date}
                    name={dateobj.name}
                  />
                   )
                  })
                }
              </div>
            </div>
      }
    </div>
  )
}

export default Find

