import React, { useContext, useState } from 'react'
import GoogleDataStudioChart from './GoogleDataStudioMap';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Cookies from 'js-cookie';
import { CookieContext } from '../context/CookieContext';
const Restaurant = ({ restaurantName,show}) => {
    const {no,setNo} = useContext(CookieContext)
    const [showMap, setShowMap] = useState(false)
    const handleDelete = () => {
        Cookies.remove(restaurantName);
        setNo(no-1);
    }
    const handleFav = () => {
        let fav= Cookies.get(restaurantName);
        fav^=1; 
        Cookies.set(restaurantName, fav);
        if(show)setNo(no-1);
        else setNo(no+1);
    }
    const handleShowMap = () => {
        setShowMap(!showMap)
    }
    return (
        <div className="restaurant">
            <div className="container">
                <p>{restaurantName}</p>
                <div className="buttons">
                    {show && <DeleteIcon onClick={handleDelete} />}
                    {show ? <StarBorderIcon onClick={handleFav} /> : <StarIcon onClick={handleFav} />}
                    {showMap?<KeyboardArrowUpIcon onClick={handleShowMap}/>:<KeyboardArrowDownIcon onClick={handleShowMap}/>}
                </div>
            </div>
            {showMap && <GoogleDataStudioChart restaurantName={restaurantName} />}
        </div>
    )
}

export default Restaurant