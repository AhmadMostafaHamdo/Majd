import React, { createContext, useState } from 'react'
import Home from './Pages/Website/Home'
import {  Route, Routes } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import User from './Pages/Dashboard/User'
import GoogleCallBack from './Pages/Auth/GoogleCallBack'
import Dashboard from './Pages/Dashboard/Dashboard'
import RequireAuh from './Pages/Auth/RequireAuh'
import Users from './Pages/Dashboard/Users'
import AddUser from './Pages/Dashboard/AddUser'
import Writer from './Pages/Dashboard/Writer'
import Err404 from './Pages/Auth/404'
import RequireBack from './Pages/Auth/RequireBack'
import Categories from './Pages/Dashboard/Categories'
import AddCategory from './Pages/Dashboard/AddCategory'
import Category from './Pages/Dashboard/Category'
import Jobs from './Pages/Dashboard/Jobs'
import AddJob from './Pages/Dashboard/AddJob'
import UpdateJob from './Pages/Dashboard/UpdateJob'
import CategoriesHome from './Pages/Website/CategoriesHome'
import JobHome from './Pages/Website/JobHome'
import Contact, { WithReactHookForm } from './Components/Website/Contact'
import ContactForm from './Components/Website/Contact'
import JobByCat from './Pages/Website/JobByCat'
import AllCours from './Components/Website/AllCours'
import CoursGallery from './Components/Website/CoursGallery'

// import Err403 from './Pages/Auth/403'
// import './Css/base/media.css'
export const ContextJo = createContext();

function App() {
    const [jo, setJo] = useState([]);
    // console.log(jo)
    // function Jobs() {
    //     return(
    //         <div className='col-lg-2 col-md-6 col-12 bg-transparent border-0'>
    //         <div className='m-1   d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100'>
    //             {
    //                 jo.map((j, i) =><div key={i}>
    //                     <p>{j.title}</p>
    //                 </div>)
    //             }
    //         </div>
    //     </div>
    //     )
    // }
    // console.log(first)
  return (
    <ContextJo.Provider value={{jo, setJo}}>
        <div className='App'>
        <Routes>
            <Route path='/' element={<Home/>}> </Route>
            {/* <Route path='/categorieshome/JobByCategories' element={<JobByCat jo={jo}/>}/>  */}
            {/* <Route path='/categorieshome/JobByCategories' element={<Jobs/>}/> */}
            <Route path='/categorieshome' element={<CategoriesHome />} />
            <Route path='/jobhome' element={<JobHome/>}/>
            <Route path='/Advices' element={<AllCours/>}/>
            <Route path='/cours' element={<CoursGallery/>}/>

            <Route path='/contact' element={<ContactForm/>}> </Route>
            <Route element={<RequireBack/>} >
                <Route path='/login' element={<Login/>}> </Route>
                <Route path='/register' element={<Register/>}> </Route>
            </Route>
            <Route path='/auth/google/callback' element={<GoogleCallBack/>}> </Route>
            <Route path='/*' element={<Err404/>} />

                {/* Protect pathes */}
        <Route element={<RequireAuh allowedRole={["1995" ,"1996" ,"1999"]}/> }>
                <Route path='/dashboard' element={<Dashboard/>}> 
                    <Route element={<RequireAuh allowedRole={["1995"]}  /> }>
                        <Route path='users' element={<Users/>}/>     
                        <Route path='users/:id' element={<User/>}/>     
                        <Route path='user/add' element={<AddUser/>}/>  
                    </Route>   
                    <Route element={<RequireAuh allowedRole={["1995","1999"]}  /> }>
                        {/* Categories */}
                        <Route path='cat' element={<Categories/>}/>  
                        <Route path='cat/:id' element={<Category/>}/>  
                        <Route path='category/add' element={<AddCategory/>}/>  
                        {/*Jobs*/}
                        <Route path='jobs' element={<Jobs/>}/>  
                        <Route path='jobs/:id' element={<UpdateJob/>}/>  
                        <Route path='job/add' element={<AddJob/>}/>  
                    
                    </Route> 
                    <Route element={<RequireAuh allowedRole={["1995","1996"]}  /> }>
                        <Route path='writer' element={<Writer/>}/> 
                         
                    </Route>   
                </Route> 
            </Route>

    

        </Routes>
        </div>
    </ContextJo.Provider>

  )
}

export default App