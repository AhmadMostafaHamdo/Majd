import React, {  useState } from 'react'
import { Form } from 'react-bootstrap';
import { Axios } from '../../Api/axios';
import { Cat} from '../../Api/Api';
import Loading from '../../Loading/Loading';

function AddCategory() {
    
    const [title,setTitle]=useState("");
    const [image,setImage]=useState("");
    const [loading,setLoading]=useState(false);

   
    


    // Handle Submit
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        const form= new FormData();
        form.append("title",title);
        form.append("image",image);
        try{
             await Axios.post(`${Cat}/add`,form);
            window.location.pathname="/dashboard/category/add";
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
            <Form.Control required  value={title} onChange={(e)=> setTitle(e.target.value)} type='text' placeholder='title...'  />
        </Form.Group>

        <Form.Group className='mb-3' controlId="exampleForm.ControlInput2">
            <Form.Label>Image</Form.Label>
            <Form.Control    onChange={(e)=> setImage(e.target.files.item(0))} type='file'/>
        </Form.Group>


        
        <button  disabled={title.length > 1  ? false :true} className='btn btn-primary'>Save</button>

    </Form>
    </>
  )
}

export default AddCategory