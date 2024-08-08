import React from 'react'
import SideBar from '../../Components/Dashboard/SideBar'
import TopBar from '../../Components/Dashboard/TopBar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='position-relative dashboard '>
        <TopBar/>
        <div  className='d-flex  gap-1' style={{marginTop:'70px'}}>
          <SideBar/>
          <Outlet />
        </div>
       
    </div>
  )
}

export default Dashboard