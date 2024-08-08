import React, { useEffect, useState } from 'react'
import Nav from '../../Components/Website/Navbar'
import { Axios } from '../../Api/axios';
import {JOBS } from '../../Api/Api';
// import  Card from '../../Components/Website/Card';
import { Container, Form } from 'react-bootstrap';
import NotFound from '../../helpers/NotFound';
import '../../helpers/notfound.css'
import CardJob from './CardJob';
import Footer from '../../Components/Website/Footer';



function JobHome(){
    const [pop, setPop] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    // Get All Jobs
    const [jobs,setJobs]=useState([]) ;
    useEffect(()=>{
        const res=Axios.get(`${JOBS}`).then((res)=>{setJobs(res.data)});
       console.log(res.data)
    },[])
   
    console.log(jobs)

  // Searching
  const [search,setSearch]=useState("");
  const filterData=jobs.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()))



  const showCategories=filterData.map((item)=>(
    <div className='col-lg-2 col-md-6 col-12 bg-transparent border-0'>
        <div className='m-1   d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100'>
            <CardJob item={item} setPop={setPop} setIsOpen={setIsOpen}/>
        </div>
    </div>
  ))
  

  return (
    <>
        <Nav/>
        <Form.Control 
        type="search" 
        aria-label='input example' 
        placeholder='search' 
        className='searchCat'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
       /> 
  
       <div className=' py-5'>
        <Container>
            <div className='d-flex align-items-stretch justify-content-center flex-wrap row-gap-2'>
                {showCategories}
            </div>
        </Container>
        {filterData.length === 0 && <><NotFound/></>}
       </div>
      {isOpen && <div className='pop'>
      <i className='close' onClick={()=>setIsOpen(prev=>!prev)}>X</i>
        <div className='pop-info'>
            <h4 className='pop-title'>{pop.title}</h4>
             <p className='info-dec'>{pop.description}</p>
            Email: <p className='info-email'>{pop.About}</p>
            Salary: <h5>{pop.price}</h5>
        </div>
        
        </div>}
       <Footer/>
    </>
  )

}

export default JobHome