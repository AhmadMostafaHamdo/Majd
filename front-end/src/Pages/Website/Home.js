import React, { useRef } from 'react'
import { motion } from "framer-motion";
import Nav from '../../Components/Website/Navbar'
// import Slides from '../../Components/Website/Slides';
import Footer from '../../Components/Website/Footer';






export default function Home() {
  const img = useRef();

  setTimeout(() => {
    document.getElementById("img1").style.left = "-20px";
    document.getElementById("img1").style.transform = "rotate(370deg)";
    document.getElementById("img2").style.right = "35px";
    document.getElementById("img2").style.transform = "rotate(-10deg)";
  }, 700);

  
   
  return (
    <> 
      <Nav/>
      <div className='container'>
        <hr/>
        <div className="home">
                <img src={require("../../Assets/images/home.png")} id="img1" ref={img} alt="home" />
                <div className="home-content">
                      <div className="ms-job">
                        <p><span>MSJOB</span> For Employment</p>
                      </div>
                  <p className="hello">Find Your Job With Us</p>
                    <motion.div className="search"
                            animate={{
                              opacity: 1,
                              top:420,
                            }}
                            
                            transition={{
                              type: "spring",
                              stiffness: 100,
                              damping: 5,
                            }}
                          >
                        {/* <input type="search" placeholder="search" /> */}
                       <button className='button-home' onClick={()=>window.location.pathname='/jobhome'}>Search JOBS</button>
                    </motion.div>
                </div>
                    <img src={require("../../Assets/images/land.png")} id="img2" alt="home" />
          </div>
              {/* <Slides/> */}

              {/* <hr/> */}
      </div>
      <Footer/>
    </>
  )
}
