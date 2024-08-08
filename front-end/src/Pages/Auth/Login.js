import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { LOGIN, baseURL } from '../../Api/Api';
import Loading from '../../Loading/Loading';
import Cookie from "cookie-universal"
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {

    // Stats
    const [form,setForm]=useState({
        email:'',
        password: '',
    })
     
    // craete  Navgiate 
    // const navigate=useNavigate();


    // create Ref
    const focus=useRef("") ;

    // Handle focus
    useEffect(()=>{
        focus.current.focus()
    },[]);

    // Handle Form change  
    function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value})
    }

     // Loading
     const [loading,setLoading]=useState(false);


    //  cookies
    const cookie=Cookie();

      // Error
    const[err,setErr]=useState("");

    // Handle Submit
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        try{
           const res= await axios.post(`${baseURL}/${LOGIN}`,{
                email:form.email,
                password:form.password,
            });
            setLoading(false);
            const token =res.data.token;
            const role= res.data.user.role;
            const go= role === "1995" ? "users" : "writer"
            cookie.set("JobClient",token);
            window.location.pathname=`/dashboard/${go}`;
            // navigate("/" ,{replace:true})
        }
        catch(err) {
            setLoading(false);
            if(err.response.status === 401){
                setErr(" Wrong Email or Password")
            }
            else{
                setErr("Internal Server Error")
            }

        }
    }
    
  return (
    <>
    {loading && <Loading/>}
    <div className='container'>
        <div className='row' style={{'height':'100vh'}}>
       <Form className='form' onSubmit={handleSubmit}>
               <div className='custom-form'>
                        <h1 className='title'>Login</h1>

                        {/*  */}
                        <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
                            <Form.Control  ref={focus} name='email' type="email" placeholder="Enter Your Email..." value={form.email} onChange={handleChange} required   />
                            <Form.Label>Email:</Form.Label>
                        </Form.Group>



                        <Form.Group className="form-custom" controlId="exampleForm.ControlInput2">
                            <Form.Control  name='password' type="password" placeholder="Enter Your Password..." value={form.password} onChange={handleChange} required   minLength="6" />
                            <Form.Label>Password:</Form.Label>
                        </Form.Group>



                        {/*  */}
                        {/* <div className='form-control'>
                            <input  required type='email' id='email' name='email' placeholder='Enter Your Email...'  value={form.email} onChange={handleChange} minLength='6'/>
                            <label htmlFor='email'>Email:</label>
                        </div> */}
                        {/* <div className='form-control'>
                            <input  required type='password' id='password' name='password' placeholder='Enter Your password...'  value={form.password} onChange={handleChange}/>
                            <label htmlFor='password'>Password:</label>
                        </div> */}
                        <button className='btn btn-primary'>LOGIN</button>
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

export default Login