import React from 'react'
import './403.css'
import { Link } from 'react-router-dom'

export default function Err403({role}) {
  return (
   <div className='text-wrapper'>
        <div className='titl' data-content={404}>
            403 - ACCESS DENIED
        </div>
        <div className='subtitl'>
            Oops , You dont have permission to access this page .
            <Link className='d-block text-center btn btn-primary' to={role==="1996" ? "/dashboard/writer" : "/"} >{role==='1996' ? "Go To Writer Page" :"Go To Home Page"} </Link>
        </div>
   </div>
  )
}
