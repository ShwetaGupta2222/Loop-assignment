import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CookieContext } from '../context/CookieContext';
function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const {user,setUser} = useContext(CookieContext)
  const Navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch('https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view', {
      headers: {
        Authorization: 'Bearer keyfXgn8PL6pB3x32',
      },
    });
    const data = await response.json();
    const validCredentials = data.records.find(
      (record) => record.fields.username === username && record.fields.password === password
    );
    if (validCredentials) {
      const obj = {user:username,password:password}
      setUser(obj);
      Navigate("/");
    } else {
      setErr(true);
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong');
  }
};


  return (
    <div className='formContainer'> 
      <div className='formWrapper'> 
      <span className='logo'>Restro</span>
          <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your email..." value={username} onChange={handleUsernameChange} />
              <input type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
              <button>Login</button>
              {err && <span>Invalid username and password!</span>}
            </form>
      </div>
    </div>
  )
}

export default Login