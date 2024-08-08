import React from 'react'
import Cookie from 'cookie-universal'
import { Outlet } from 'react-router-dom';
function RequireBack() {

 const cookie=Cookie();
 const token=cookie.get("JobClient");
  return  token ? window.history.back() :<Outlet/>;
  
}

export default RequireBack