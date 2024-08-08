import React, { createContext, useEffect, useState } from 'react'
import Cookie from "cookie-universal"

export const WindowSize=createContext(null);
function WindowContext({children}) {
    const [windowSize,setWindowSize]=useState(window.innerWidth);
    
    useEffect(() =>{
        function setWindowWidth(){
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize' ,setWindowWidth);

        // CleanUP Function
        return () =>{
            window.removeEventListener("resize" ,setWindowWidth)
        }
    },[])
  return (
    <WindowSize.Provider value={{windowSize,setWindowSize}}>
        {children}
    </WindowSize.Provider>
  )
}

export default WindowContext