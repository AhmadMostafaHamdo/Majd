
import React from 'react'
import { LOGOUT } from '../../Api/Api'
import { Axios } from '../../Api/axios';
import { useNavigate } from 'react-router-dom';


function Logout() {
    async function handleLogOut(){
        try{
          await Axios.get(`/${LOGOUT}`);
          //  console.log(res)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <button onClick={handleLogOut}>Logout</button>
  )
}

export default Logout