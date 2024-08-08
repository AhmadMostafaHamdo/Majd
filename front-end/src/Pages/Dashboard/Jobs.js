import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableShow from './Table'
import { Axios } from '../../Api/axios'
import {  JOBS, Job } from '../../Api/Api'

export default function Jobs() {
  const [jobs,setJobs]=useState([]);
  const [page,setPage]=useState(4);
  const [limit,setLimit]=useState(4);
  const[loading,setLoading]=useState(false);
  const [total,setTotal]=useState(0);

  const header=[
    {
      key:"images",
      name:"Image"
    },
    {
      key:'title',
      name:"Title"
    },
    {
      key:"description",
      name:"Description"
    }, 
    {
        key:"price",
        name:"Salary"
    },
    {
        key:"rating",
        name:"Extra work"
    },{
      key:"created_at",
      name:"Created"
    },
    {
      key:"updated_at",
      name:"Updated"
    },
  ]
console.log(jobs)
  // Get All Jobs
  useEffect(() =>{
    setLoading(true)
    Axios.get(`/${JOBS}?page=${page}&limit=${limit}`).then((data) => {setJobs(data.data.data);setTotal(data.data.total)}).catch((err) => console.log(err)).finally(()=>setLoading(false))
  },[limit,page])
  
  // delete Job
  async function  handleDelete(id){ 
    try{
      const res = await Axios.delete(`${Job}/${id}`);
      setJobs((prev) => prev.filter((item) => item.id!==id) )
    }catch(err){
      console.log(err)
    }
}

  return (
    <div className='bg-white w-100 p-2'>
      <div className='d-flex align-items-center justify-content-between'>
         <h1>Jobs Page</h1>
         <Link  className='btn btn-primary'  to="/dashboard/job/add">Add Job</Link>
      </div>
   

    <TableShow 
        total={total} 
        setLimit={setLimit}
        loading={loading} 
        page ={page}
         limit={limit}
         header={header} 
         data={jobs}
        delete={handleDelete}
          setPage={setPage}
          search="title"
          searchLink={Job}
          />
    </div>
  );
}
