import "./Find.css"
import react, { useState } from "react";
import axios from 'axios';
import Card from "../Cards/Card.jsx"
function Find() {
  const [name, setname] = useState("");
  const [date, setdate] = useState(null)
  const [isdata, setisdata] = useState(false);
  const [isdatacal, setisdatacal] = useState(true)
  const [reald, setreald] = useState({});
  const [realdd, setrealdd] = useState({});
  const [iscalval, setiscalval] = useState(false);  //for date null or not
  const [realdstatus, setrealdstatus] = useState(false);
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
            a.push(el)
            setrealdd(a)
            setiscalval(false)
          })
        }
        setisdatacal(false);
      })
    } catch (error) {
      console.log(error)
    }
  }
  console.log(realdd)
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
          <input type="date" onChange={(e) => { setdate(e.target.value) }}
            value={date}></input>
          <button type="submit">GO</button>
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
                    console.log(dateobj)
                    return (
                      dateobj.orders.map(el => {
                        return (
                          <Card
                            listid={el.list}
                            amount={el.amount}
                            dat={el.date}
                            name={dateobj.firstName}
                          />
                        )
                      })
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

