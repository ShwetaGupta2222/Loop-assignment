import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete } from '@mui/material';
import GoogleDataStudioChart from './GoogleDataStudioMap';
import logo from '../img/logo.png'
import Cookies from 'js-cookie';
import { CookieContext } from '../context/CookieContext';
const Searchbar = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("")
  const [show, setShow] = useState(true);
  const { no, setNo,setUser } = useContext(CookieContext)
  useEffect(() => {
    if (input === "") {
      setData([]);
      setShow(true);
    }
  }, [input])
  const fetchData = async (value) => {
    setShow(true);
    setInput(value);
    console.log(value);
    if (!value) { return; }
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?filterByFormula=FIND( '${value.toUpperCase()}',UPPER({Name}))&view=Grid%20view`,
        {
          headers: {
            Authorization: "Bearer keyfXgn8PL6pB3x32",
          },
        }
      );
      const data1 = await response.json();
      setData(data1.records);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = () => {
    if (show) { return; }
    Cookies.set(input, 0);
    setInput("");
    setNo(no + 1);
  }
  const handleLogout = ()=>{
    // alert("clicked")
    setUser(null);
  }
  return (
    <div className="Searchbar">
      <div className='nav'>
        <div className='logo'><img src={logo} /></div>
        <input
          type="text"
          placeholder="Enter restaurant name..."
          value={input}
          onInput={(e) => { fetchData(e.target.value) }}
        />
        <button onClick={handleAdd}>Add</button>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
      <div className='restraurants-list'>
        <div className='container'>
          {data && show &&
            data.map((restaurant) => (
              <button onClick={(e) => { setInput(restaurant.fields.Name); setShow(false); }} key={restaurant.id}>{restaurant.fields.Name}</button>
            ))}
        </div>
      </div>
      {!show && <GoogleDataStudioChart restaurantName={input} />}
    </div>
  );
};

export default Searchbar;

