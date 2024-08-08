import React, { useContext, useEffect, useRef, useState } from 'react'
import Nav from '../../Components/Website/Navbar'
import { Axios } from '../../Api/axios';
import { CAT, JOBS } from '../../Api/Api';
import  Card from './Card';
import { Container, Form } from 'react-bootstrap';
import NotFound from '../../helpers/NotFound';

import '../../helpers/notfound.css'
import Footer from '../../Components/Website/Footer';
import { Outlet } from 'react-router-dom';
import { ContextJo } from '../../App';
import CardJob from './CardJob';


function CategoriesHome() {
  const jobRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [pop, setPop] = useState({});
  
    const {jo} = useContext(ContextJo)


      
    // Get All Gategory
    const [categories,setGategories]=useState([]) ;
    const [jobs,setJobs]=useState([]) ;
    const [translate, setTranslate] = useState(false);
    translate
    && jobRef.current.scrollIntoView({ behavior: "instant", block: "end" })
    // :console.log("n")
    useEffect(()=>{
      Axios.get(`${CAT}`).then((res)=>{setGategories(res.data)})
    },[])
    // Get All Jobs
      useEffect(()=> {
          const res = Axios.get(`${JOBS}`).then((res)=>{setJobs(res.data)});
      },[])

  // Searching
  const [search,setSearch]=useState("");
  const filterData=categories.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()))



  const showCategories = filterData.map((item, i)=>(
    <div className='col-lg-2 col-md-6 col-12 bg-transparent border-0'>
        <div className='m-1   d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100'>
            <Card  id={item.id} img={item.image} title={item.title}  jobs={jobs} setTranslate={setTranslate} key={i}/>
        </div>
    </div>
  ))
  let showJobs = jo.map((item,i)=>(
    <div className='col-lg-2 col-md-6 col-12 bg-transparent border-0'>
    <div className='m-1   d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100'>
        <CardJob item={item} setPop={setPop} setIsOpen={setIsOpen}/>
    </div>
</div>
  ))
  let scroll = `${window.scrollY + 100}px`;
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
            <div>{}</div>
        </Container>
        {filterData.length === 0 && <><NotFound/></>}
       </div>
       <Outlet/>
       <div ref={jobRef} style={{height: "calc(100vh - 90px", display: "flex"}} className='d-flex align-items-stretch justify-content-center flex-wrap row-gap-2'>
          {showJobs}
       </div>
       {isOpen && <div className='pop' style={{top: scroll}}>
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

export default CategoriesHome