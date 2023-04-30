import React, { useContext, useEffect, useState } from 'react'
import { CookieContext } from '../context/CookieContext';
import Cookies from 'js-cookie';
import Restaurant from './Restaurant';
import back from '../img/background.jpg'
const Feed = () => {
  const {no,setNo} = useContext(CookieContext)
  const [all, setAll] = useState([])
  const [fav, setFav] = useState([])
  const [show, setShow] = useState(true)
  useEffect(() => {
    const allCookie = Cookies.get();
    let All = []
    let Fav = []
    for (let key in allCookie) {
      if(allCookie[key]==0) All.push(key)
      if(allCookie[key]==1) Fav.push(key)
    }
    setAll(All);
    setFav(Fav);
  }, [no])
  
  return (
    <div className='Feed'>
        <div className="background">
           <img src = {back}/>
        </div>
        <div className='feed'>
             <div className='buttons'>
                 <button onClick={()=>{if(!show)setShow(!show)}} className={show?"border":""}>Added Restaurants</button>
                 <button onClick={()=>{if(show)setShow(!show)}} className={show?"":"border"}>Bookmarked Restaurants</button>
             </div>
            {show?
              all.map((name,i)=><Restaurant restaurantName={name} show={show}/>)
              :
              fav.map((name,i)=><Restaurant restaurantName={name} show={show}/>)
            }
        </div>
    </div>
  )
}

export default Feed