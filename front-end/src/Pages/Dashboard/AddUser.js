import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { Axios } from '../../Api/axios';
import { USER } from '../../Api/Api';
import Loading from '../../Loading/Loading';

function AddUser() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [role,setRole]=useState("");
    const[password,setPassword]=useState("")
    const [loading,setLoading]=useState(false);

   
    


    // Handle Submit
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        try{
             const res= await Axios.post(`${USER}/add`,{
                name:name,
                email:email,
                password:password,
                role:role,
             });
            window.location.pathname="/dashboard/users";
        }catch(err){
            setLoading(false);
            console.log(err)
        }

    }
  return (
    <>
    {loading && <Loading/>}
    <Form className='bg-white w-100 mx-2 p-3' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId="exampleForm.ControlInput1">
            <Form.Label>User Name</Form.Label>
            <Form.Control required  value={name} onChange={(e)=> setName(e.target.value)} type='text' placeholder='name...'/>
        </Form.Group>
        <Form.Group className='mb-3' controlId="exampleForm.ControlInput2">
            <Form.Label>Email</Form.Label>
            <Form.Control  value={email} onChange={(e)=> setEmail(e.target.value)} type='email' placeholder='name@example.com...'/>
        </Form.Group>

        <Form.Group className='mb-3' controlId="exampleForm.ControlInput4">
            <Form.Label>Password</Form.Label>
            <Form.Control  value={password} onChange={(e)=> setPassword(e.target.value)} type='password' placeholder='Enter Password...'/>
        </Form.Group>

        <Form.Group className='mb-3' controlId="exampleForm.ControlInput3">
            <Form.Label>Role</Form.Label>
            <Form.Select  value={role} onChange={(e)=> setRole(e.target.value)} >
                <option disabled value="">SelectRole</option>
                <option value="1995">Admin</option>
                <option value="2001">User</option>
                <option value="1996">Writer</option>
                <option value="1999">Publissher Manger</option>
            </Form.Select>
        </Form.Group>
        <button  disabled={name.length >1 && email.length >1 && password.length >6 && role!=="" ? false :true} className='btn btn-primary'>Save</button>

    </Form>
    </>
  )
}

export default AddUser