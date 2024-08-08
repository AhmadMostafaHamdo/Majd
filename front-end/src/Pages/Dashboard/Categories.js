import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableShow from './Table'
import { Axios } from '../../Api/axios'
import { CAT, Cat } from '../../Api/Api'
import { Form } from 'react-bootstrap'
import TransformData from '../../helpers/TransformDate'

export default function Categories() {
  const [Categories,setCategories]=useState([]);
  const [limit,setLimit]=useState(4);
  const[page,setPage]=useState(4);
  const [loading,setLoading]=useState(false);
  const [total,setTotal]=useState(0);
  // const [search,setSearch]=useState('');




  


  const header=[
    {
      key:'title',
      name:"Title"
    },
    {
      key:"image",
      name:"Image"
    },
    {
      key:"created_at",
      name:"Created"
    },
    {
      key:"updated_at",
      name:"Updated"
    },
  ]

  // Get All Categories
  useEffect(() =>{
    setLoading(true);
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`).then((data) => {setCategories(data.data.data); setTotal(data.data.total)}).catch((err) => console.log(err)).finally(()=> setLoading(false))
  },[limit,page])

  // delete user
  async function  handleDelete(id){ 
    try{
      const res = await Axios.delete(`${Cat}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id!==id) )
    }catch(err){
      console.log(err)
    }
}

  return (
    <div className='bg-white w-100 p-2'>
      <div className='d-flex align-items-center justify-content-between'>
         <h1>Categories Page</h1>
         <Link  className='btn btn-primary'  to="/dashboard/Category/add">Add Category</Link>
      </div>
   


      {/* <Form.Control 
        type="search" 
        aria-label='input example' 
        placeholder='search' 
        className='my-2'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      /> */}

    {/* <button onClick={getSearchData}>get Data</button> */}
    <TableShow 
        page={page}
        setLimit={setLimit}
        limit={limit}
        header={header}
        data={Categories}
        delete={handleDelete}
        setPage={setPage}
        loading={loading}
        total={total}
        search="title"
        searchLink={Cat}
       />
    
    </div>

  );
}
