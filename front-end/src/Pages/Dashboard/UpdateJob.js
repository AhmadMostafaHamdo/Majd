import React, {  useEffect, useRef, useState } from 'react'
import { Button, Form, ProgressBar } from 'react-bootstrap';
import { Axios } from '../../Api/axios';
import { CAT, Job} from '../../Api/Api';
import Loading from '../../Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateJob() {
    const [form,setForm]=useState({
        category:"Select Category",
        title:"",
        description:"",
        price:"",
        About:"",
        discount:""
    });
   
    const[images,setImages]=useState([]);
    const [loading,setLoading]=useState(false);  
    const [Categories,setCategories]=useState([]);
    const {id}=useParams();
    const [imagesFromServer,setImagesFromServer]=useState([]);
    const [uploading,setUploading]=useState(0);
    const [idsFromServer,setIdsFromServer]=useState([]);
    const nav=useNavigate()

    
    //   REF
    const focus=useRef();
    const openImage=useRef(null)
    const ids=useRef([])


    useEffect(()=>{
       focus.current.focus(); 
    },[])

    // Handle Change
    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value});
    }
    
    // Get All Categories
        useEffect(() =>{
            Axios.get(`/${CAT}`).then((data) => setCategories(data.data)).catch((err) => console.log(err))
        },[])

    //  Get product depend on id 
    useEffect(() =>{
        Axios.get(`/${Job}/${id}`).then((data) => {
            setForm(data.data[0]);
            setImagesFromServer(data.data[0].images)
        }).catch((err) => console.log(err))
    },[])

    // Handle Image Delete
    async function handleImageDelete(id,file){
        const findId=ids.current[id]
        try{
            await Axios.delete(`/product-img/${findId}`).then((data)=>console.log(data))
            setImages((prev)=> prev.filter((image)=> image !==file));
            ids.current=ids.current.filter((i) => i!==findId);
            j.current--;
        }
        catch(err){
            console.log(err)
        }
    }

    async function handleImageDeleteFromServer(id){
        setImagesFromServer((prev)=> prev.filter((image)=> image.id !==id));
        setIdsFromServer((prev) => {return [...prev,id]})
        // try{
            
        //     await Axios.delete(`/product-img/${id}`).then(data => console.log(data));
        // }
        // catch(err){
        //     console.log(err)
        // }
    }
    //  Mapping
     const categoriesShow=Categories.map((item,key) => (
        <option  key={key} value={item.id}> {item.title} </option>
     ))

     const imagesShow=images.map((item,key) => (
        <div className='border p-2 w-100' key={key}>
          <div className='d-flex align-items-center justify-content-between' >
            <div className='d-flex align-items-center justify-content-start gap-2'  >
                    <img src={URL.createObjectURL(item)} alt='' width='80px' ></img>
                <div className='mb-1'>
                    <p className='mb-1'>{item.name}</p>
                    <p>{ item.size /1024 <900 ? (item.size / 1024).toFixed(2)+'KB' :item.size /(1024* 1024)+"MB" }</p>
                </div>
             </div>
                <Button  onClick={()=> handleImageDelete(item.id)} 
                variant='danger'>Delete</Button>
          </div>
             <div className='mt-3'>
                    <ProgressBar  
                     now={uploading} label={`${uploading}%`} 
                     />

             </div>
        </div>
     ));

     const imagesFromSeverShow=imagesFromServer.map((item,key) => (
       <div key={key} className='border p-2 col-2 position-relative'>
            <div className='d-flex align-items-center justify-content-start gap-2'  >
                    <img src={item.image} alt='' className='w-100' ></img>    
            </div>
            <div  style={{cursor:"pointer"}} className='position-absolute top-0 end-0 bg-danger rounded text-white'>
                <p className='py-1 px-2 m-0' onClick={()=> handleImageDeleteFromServer(item.id)} >x</p>
            </div>
       </div>
             
     ));

console.log(idsFromServer)

    // Handle Edt
    async function handleEdit(e){
        e.preventDefault();
        setLoading(true);
        try{
            for (let i = 0; i < idsFromServer.length; i++) {
                await Axios.delete(`/product-img/${idsFromServer[i]}`).then(data => console.log(data));
            }
             await Axios.post(`${Job}/edit/${id}`,form);
             nav("/dashboard/jobs")
           
        }catch(err){
            setLoading(false);
            console.log(err)
        }
    }


    // Handle Images
    const j=useRef(-1);
    async function HandleImagesChange(e){
        setImages((prev) => [...prev,...e.target.files])
        const imagesAsFile=e.target.files;
        const data=new FormData();
        for (let i = 0; i < imagesAsFile.length; i++) {
            j.current++;
            data.append("image",imagesAsFile[i]);
            data.append("product_id",id);
            try{
                const res=await Axios.post("/product-img/add",data,{
                    onUploadProgress:(event)=>{
                        const {loaded}=event;
                        const {total}=event;
                        setUploading(Math.floor((loaded*100) /total))
                    }
                });
                ids.current[j.current]=res.data.id
            }
            catch(err){
                console.log(err)
            }
            
        }
    }


  return (
    <>
    {loading && <Loading/>}
    <Form className='bg-white w-100 mx-2 p-3' onSubmit={handleEdit}>

       <Form.Group className='mb-3' controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select name='category'  ref={focus}   value={form.category} onChange={handleChange}   >
                <option disabled >Select Category</option>
               {categoriesShow}
            </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control name='title'  required  value={form.title} onChange={handleChange} type='text' placeholder='title...'   />
        </Form.Group>

        <Form.Group className='mb-3' controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control required  name='description' value={form.description} onChange={handleChange} type='text' placeholder='description...'   />
        </Form.Group>

        <Form.Group className='mb-3' controlId="price">
            <Form.Label>Salary</Form.Label>
            <Form.Control required  name="price" value={form.price} onChange={handleChange} type='text' placeholder='Salary...'   />
        </Form.Group>

        <Form.Group className='mb-3' controlId="discount">
            <Form.Label>Extra Work</Form.Label>
            <Form.Control required  name="discount" value={form.discount} onChange={handleChange} type='text' placeholder='Extra Work...'  />
        </Form.Group>

        <Form.Group className='mb-3' controlId="About">
            <Form.Label>About</Form.Label>
            <Form.Control required  name='About' value={form.About} onChange={handleChange} type='text' placeholder='About...'   />
        </Form.Group>

        <Form.Group className='mb-3' controlId="images">
            <Form.Label>Images</Form.Label>
            <Form.Control  ref={openImage} hidden multiple onChange={HandleImagesChange} type='file'   />
        </Form.Group>

        <div  onClick={()=> openImage.current.click()} className='d-flex align-items-center justify-content-center  rounded gap-2 py-2 w-100 flex-column' style={{
            border: "2px dashed #0086fe",
            marginBottom:"10px",
            cursor:"pointer"
        }}>
            <img src={require('../../Assets/Upload-Transparent.png')}  alt='Upload Here' width="100px"/>
            <p className='fw-bold' style={{color:'#0086fe'}}>Upload Images </p>
        </div>
        <div className='d-flex align-items-start flex-wrap gap-2'>{imagesFromSeverShow}</div>
        <div className='d-flex align-items-start flex-column gap-2'>{imagesShow}</div>
        <button   className='btn btn-primary' >Save</button>

    </Form>
    </>
  )
}

export default UpdateJob