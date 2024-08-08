import { Link} from "react-router-dom";
import {  useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Axios } from "../../Api/axios";
import { LOGOUT } from "../../Api/Api";
import Cookie from 'cookie-universal'



export default function Nav() {

  const ul = useRef();
  const [ulIcon, setUlIcon] = useState(true);
  function handelLink() {
    if (ul.current.style.display === "block") {
        ul.current.style.display = "none";
        setUlIcon(true)
    } else {
        ul.current.style.display = "block";
        setUlIcon(false)
    }
  }


  const cookie=Cookie();
  const token=cookie.get("JobClient");
  
  
  async function handleLogOut(){
    try{
       await Axios.get(`/${LOGOUT}`);
       cookie.remove("JobClient")
       window.location.pathname='/login'
    }catch(err){
        console.log(err.message)
    }}

   

   


  return (
    <div className="nav">
      <span className="next-logo">MSJOB</span>
      <img src={require("../../Assets/images/logo.png")} alt="logo" />
      <div className="nav-link" ref={ul}>
        <ul className="ul">
          <li>
            <Link to="/" className="lin">Home</Link>
          </li>
         <li>
            <Link to="/categoriesHome" className="lin">Categories</Link>
          </li>
          <li>
            <Link to="/jobhome" className="lin">Jobs</Link>
          </li>
          <li>
            <Link to="/Advices" className="lin">Advices</Link>
          </li>
          <li>
            <Link to="/contact" className="lin">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="nav-3">
       { !token? <><Link to="/login" className="btn btn-primary bt-home">Login</Link>
       <Link to="/register" className="btn btn-primary bt-home">Register</Link> </>:<><button className="btn btn-primary logout" onClick={handleLogOut}>Logout</button></>}
        <i onClick={handelLink}>
                  {ulIcon
                  ?<FontAwesomeIcon icon={faBars} />
                  :<FontAwesomeIcon icon={faTimes} />
                  }
        </i>
      </div>
    </div>
  );
}
