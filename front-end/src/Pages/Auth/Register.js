import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { REGISTER, baseURL } from '../../Api/Api';
import Loading from '../../Loading/Loading';
import Cookie from "cookie-universal"
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
    // Stats
    const [form,setForm]=useState({
        name:'',
        email:'',
        password: '',
    })

    // create Ref
    const focus=useRef("") ;

        // Handle focus
        useEffect(()=>{
            focus.current.focus()
        },[]);
    
    // Loading
    const [loading,setLoading]=useState(false);

     //  cookies
     const cookie=Cookie();

    // Error
    const[err,setErr]=useState("");

    // craete Navigate
    const navigate=useNavigate();
     
    // Handle Form change
    function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value})
    }

    // Handle Submit
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        try{
        const res=   await axios.post(`${baseURL}/${REGISTER}`,form);
            setLoading(false);
            const token =res.data.token;
            cookie.set("JobClient",token);
            // window.location.pathname="/";
            navigate('/',{replace:true})
        }
        catch(erro) {
            setLoading(false);
            if(erro.response.status === 422){
                setErr("Email Is already been taken")
            }
            else{
                setErr("Internal Server Error")
            }
        }
    }
    // console.log(form)
  return (
   <>
    {loading && <Loading/>}
    <div className='container'>
       <div className='row ' style={{'height':'100vh'}}>
         <Form  className='form' onSubmit={handleSubmit}>
                <div className='custom-form'>
                    <h1 className='title'>Register Now</h1>

                    <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
                            <Form.Control  ref={focus}  type="text" placeholder="Enter Your Name..." value={form.name} onChange={handleChange} required  name='name' />
                            <Form.Label>Name:</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-custom" controlId="exampleForm.ControlInput2">
                            <Form.Control   type="email" placeholder="Enter Your Email..." value={form.email} onChange={handleChange} required  name='email' />
                            <Form.Label>Email:</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-custom" controlId="exampleForm.ControlInput3">
                            <Form.Control   name='password' type="password" placeholder="Enter Your Password..." value={form.password} onChange={handleChange} required  name='password' minLength='6' />
                            <Form.Label>Name:</Form.Label>
                    </Form.Group>
                    {/*  */}
                    {/* <div className='form-control'>
                        <input type='text'  id='name' name='name' placeholder='Enter Your Name...'  required value={form.name} onChange={handleChange}/>
                        <label htmlFor='name'>Name</label>
                    </div> */}
                    {/* <div className='form-control'>
                        <input type='email'  id='email' name='email' placeholder='Enter Your Email...' required  value={form.email} onChange={handleChange}/>
                        <label htmlFor='email'>Email</label>
                    </div>
                    <div className='form-control'>
                        <input type='password'  minLength='6' id='password' name='password' placeholder='Enter Your password...'  required value={form.password} onChange={handleChange}/>
                        <label htmlFor='password'>Password</label>
                    </div> */}
                    <button className='btn btn-primary'>Register</button>

                    <div className='google-btn'>
                            <a href='http://127.0.0.1:8000/login-google'>
                              <div className='google-icon-wrapper'>
                                    <img  
                                    className='google-icon'
                                    src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                                    alt='sign in with google'
                                    />
                              </div>
                              <p className='btn-text'>
                                 <b>Sign In With Google</b>
                              </p>

                            </a>
                        </div>
                    {err !== "" && <span className='error'>{err}</span>}
                </div>
            </Form>
       </div>
    </div>
   </>
  )
}

export default Register