import React, { useContext, useEffect, useState }  from 'react'
import '../../Css/component/card.css'
import { Axios } from '../../Api/axios';
import { JOBS } from '../../Api/Api';
import { Context, ContextJo } from '../../App';

function Card({id, title,img, jobs, setTranslate}) {
        const jo = useContext(ContextJo)
      // Get All Jobs
       async function handle(e)
        {
            e.preventDefault()
            const filterData= await jobs.filter((item)=>item.category=== id)
            setTranslate(true)
           await jo.setJo(filterData)
            // window.location.pathname='/categorieshome/JobByCategories'
        }
  return (
    
            <div class="cardd" >
                <div class="align">
                    <span class="red"></span>
                    <span class="yellow"></span>
                    <span class="green"></span>
                </div>

            <h5>{title}</h5>
            <p>
                <img src={img} alt=''/>
               <button className='btn btn-primary' 
               onClick={handle}
            // onClick={() => console.log(jobs)}
                  >Show Jobs</button>
            </p>
        </div>
    
  )
}

export default Card