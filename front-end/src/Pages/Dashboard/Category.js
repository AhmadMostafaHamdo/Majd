import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { Axios } from '../../Api/axios';
import { Cat } from '../../Api/Api';
import Loading from '../../Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';

function Category() {
    const [title,setTitle]=useState("");
    const [image,setImage]=useState("");
    const [disable,setDisable]=useState(true);
    const [loading,setLoading]=useState(false);
    const nav=useNavigate();

    const {id}=useParams()
    // const id=Number(window.location.pathname.replace("/dashboard/cat/",""))
    
    useEffect(()=>{
        setLoading(true);
        Axios.get(`${Cat}/${id}`).then((data)=>{
            setTitle(data.data.title);
            setLoading(false);
        }).then(()=> setDisable(false)).catch(()=> nav("/dashboard/cat/page/404" , {replace:true}) )
    },[])

    // Handle Submit
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        const form= new FormData();
        form.append("title",title);
        form.append("image",image);
        try{
             const res= await Axios.post(`${Cat}/edit/${id}`,form)
            window.location.pathname="/dashboard/cat";
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
            <Form.Label>Title</Form.Label>
            <Form.Control required  value={title} onChange={(e)=> setTitle(e.target.value)} type='text' placeholder='title...'/>
        </Form.Group>
        <Form.Group className='mb-3' controlId="exampleForm.ControlInput2">
            <Form.Label>Image</Form.Label>
            <Form.Control    onChange={(e)=> setImage(e.target.files.item(0))} type='file'/>
        </Form.Group>

        <button disabled={disable} className='btn btn-primary'>Save</button>

    </Form>
    </>
  )
}

export default Category