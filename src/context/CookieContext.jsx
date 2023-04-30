import { createContext ,useEffect,useReducer,useState} from "react";

export const CookieContext = createContext();

export const CookieContextProvider =({children})=>{
    const [user, setUser] = useState(null)
    const [no, setNo] = useState(0)

    return(
    <CookieContext.Provider value={{no,setNo,user,setUser}}>
        {children}
    </CookieContext.Provider>
    )
}