
import React, { useEffect, useState } from 'react'
import { USER, USERS } from '../../Api/Api';

import { Axios } from '../../Api/axios';
import { Link } from 'react-router-dom';
import TableShow from './Table';

function Users() {
  const [users,setUsers]=useState([]);
  const [currentUser,setCurrentUser]=useState("");
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(3);
  const [loading,setLoading]=useState(false);
  const [total,setTotal]=useState(0);
  



  const header=[
    {
      key:"name",
      name:"Username",
    },
    {
      key:"email",
      name:"Email",
    },
    {
      key:"role",
      name:"Role",
    },{
      key:"created_at",
      name:"Created"
    },
    {
      key:"updated_at",
      name:"Last Login"
    },

  ]
    useEffect(()=> {
      Axios.get(`${USER}`).then((data) => setCurrentUser(data.data))
    },[])

    useEffect(() =>{
      setLoading(true)
      Axios.get(`/${USERS}?page=${page}&&limit=${limit}`).then((data) => {setUsers(data.data.data);setTotal(data.data.total)}).catch((err) => console.log(err)).finally(()=>setLoading(false))
    },[limit,page])

    // delete user
    async function  handleDelete(id){ 
      try{
        const res = await Axios.delete(`${USER}/${id}`);
        setUsers((prev) => prev.filter((item) => item.id!==id) )
      }catch(err){
        console.log(err)
      }
  }

  return (
    <div className='bg-white w-100 p-2'>
      <div className='d-flex align-items-center justify-content-between'>
         <h1>Users Page</h1>
         <Link  className='btn btn-primary'  to="/dashboard/user/add">Add User</Link>
      </div>
   

      <TableShow
       total={total}  
      loading={loading} 
      setLimit={setLimit} 
      page={page} limit={limit} 
      setPage={setPage}  header={header}
       data={users} delete={handleDelete} 
       currentUser={currentUser}
       search="name"
       searchLink={USER}
       />
       
    </div>
  )
}

export default Users