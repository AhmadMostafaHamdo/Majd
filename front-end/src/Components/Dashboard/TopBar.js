import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Menu } from '../../Context/MenuContext';
import { LOGOUT, USER } from '../../Api/Api';
import { Axios } from '../../Api/axios';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Cookie from 'cookie-universal'
 

function TopBar() {
  const menu=useContext(Menu);
  const Navigate=useNavigate();
  const setIsOpen=menu.setIsOpen;
  const [name,setName]=useState("");
  const cookie=Cookie();



  useEffect(() => {
    Axios.get(`/${USER}`).then((data) =>setName(data.data.name)).catch(()=> Navigate('/login',{replace:true}))
   },[])

   async function handleLogOut(){
    try{
       await Axios.get(`/${LOGOUT}`);
       cookie.remove("JobClient")
       window.location.pathname='/login'
    }catch(err){
        console.log(err)
    }
}


  return (
    <div className='top-bar'>
      <div className=' d-flex align-items-center justify-content-between h-100'>
          <div className='d-flex align-items-center  gap-5'>
                <h2 style={{fontWeight:"bold"}}>MSJOB</h2>
                <FontAwesomeIcon  onClick={()  => setIsOpen(prev => !prev) } cursor={'pointer'} icon={faBars}/>
          </div>
          <div>
              <DropdownButton id="dropdown-basic-button" title={name}>
                <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
              </DropdownButton>
          </div>
        </div>
    </div>
    
  )
}

export default TopBar