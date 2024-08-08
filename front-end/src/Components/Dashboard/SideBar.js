import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  NavLink, useNavigate } from 'react-router-dom'
import { Menu } from '../../Context/MenuContext'
import { WindowSize } from '../../Context/WindowContext'
import { USER } from '../../Api/Api'
import { Axios } from '../../Api/axios'
import { links } from './NavLink'
// import './bars.css'



function SideBar() {
 
  const menu=useContext(Menu);
  const windowContext=useContext(WindowSize);
  const windowSize=windowContext.windowSize;
  // console.log(windowSize)
  const isopen=menu.isopen;


  const Navigate=useNavigate();
// GetUser
const [user,setUser]=useState("");
useEffect(() => {
     Axios.get(`/${USER}`).then((data) =>setUser(data.data)).catch(()=> Navigate('/login',{replace:true}))
},[])

  

  return (
    <>
      <div style={
        {
          position:'fixed',
          top:'70px',
          left:'0',
          width:'100%',
          height:'100vh',
          backgroundColor:'rgba(0,0,0,0.2)',
          display:windowSize <'768' && isopen ? 'block':'none',
          
        }
      }> </div>
      <div className='side-bar pt-3' style={
        { left :windowSize <'768' ?  (isopen ? 0 : "-100%"):'0',
          width: isopen ? "220px" :"fit-content", 
          position: windowSize <'768' ? 'fixed':'sticky'
        }
        }>
         
          {links.map((link,key) =>(
            link.role.includes(user.role) && (   
              <NavLink   key={key+1} to={link.path} className='d-flex align-items-center gap-2 side-bar-link'>
                   <FontAwesomeIcon   icon={link.icon} style={{padding : isopen ?  "10px 8px 10px 15px" : "10px 13px"}}/>
                      <p style={
                      {
                        display :isopen ? "block" :"none",
                        margin:"10px 0px"
                      }
                   }>{link.name}</p>
               </NavLink>)
          ) )}
          
      </div>
    </>
  )
}

export default SideBar