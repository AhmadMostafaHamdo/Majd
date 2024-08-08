import React, { useEffect, useState } from 'react'
import {  Outlet, useNavigate } from 'react-router-dom'
import Cookie from 'cookie-universal'

import { USER } from '../../Api/Api';
import Loading from '../../Loading/Loading';
import { Axios } from '../../Api/axios';
import Err403 from './403';

export default function RequireAuh({allowedRole}) {
  const cookie=Cookie();
  const token=cookie.get("JobClient");
  const Navigate=useNavigate();

// GetUser
const [user,setUser]=useState("");
useEffect(() => {
     Axios.get(`/${USER}`).then((data) =>setUser(data.data)).catch(()=> Navigate('/login',{replace:true}))
},[])



  return (
     token ? ( user=== "" ? (<Loading/>) : allowedRole.includes(user.role)? (<Outlet/>) : (<Err403 role={user.role}/>)  ): (<Navigate to={'/login'} replace={true} />)
  )
}
