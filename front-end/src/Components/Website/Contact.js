 import Footer from "./Footer";
import Nav from "./Navbar";

export default function Contact() {
  

    return(
        <>
            <Nav/>
            {/* <hr/> */}
            <hr/>
            <div className="contact">
            <form>
            <div className="contact-content">
                <div className="row-1">
                <div className="filed">
                        <input type="text" placeholder="name"/>
                        <span>name</span>
                    </div>
                    <div className="filed">
                        <input type="email" placeholder="email"/>
                        <span>email</span>
                    </div>
                </div>
                    <div className="row-2">
                    <div className="filed">
                        <input type="text" placeholder="number"/>
                        <span>number</span>
                    </div>
                    <div className="filed">
                        <input type="text" placeholder="location"/>
                        <span>location</span>
                    </div>
                    </div>
                    <div className="row-3 filed">
                        <textarea placeholder="Message"/>
                        <span>message</span>
                    </div>
                </div>
                <button>Submit</button>
            </form>
            </div>
            <Footer/>
        </>
    )
}


// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
// import React, { useRef, useState } from 'react';
// import { useForm, ValidationError } from '@formspree/react';
// import Nav from './Navbar';
// import Footer from './Footer';

// export default function ContactForm() {
//   const [state, handleSubmit] = useForm("xzzprywp");
//   const [email, setEmail] = useState("");
//   const handelClick = () => {
//     let text = "email : " + email  + '\n' +"message :" + document.getElementById("message").value;
//     console.log(text)
//   }
//   if (state.succeeded) {
//       return <p>Thanks for joining!</p>;
//   }

//   return (
//      <>
//         <form onSubmit={handleSubmit}
//             action="https://formspree.io/f/xzzprywp"
//             method="POST" 
//         >
//         <label htmlFor="email">
//             Email Address
//         </label>
//         <input
//             id="email"
//             type="email" 
//             name="email"
//             onChange={(e)=>setEmail(e.target.value)}
        
//         />
//         <ValidationError 
//             prefix="Email" 
//             field="email"
//             errors={state.errors}
//         />
//         <textarea 
//             id="message"
//             name="message"
//         ></textarea>
//         <ValidationError 
//             prefix="Message" 
//             field="message"
//             errors={state.errors}
//         />
//         <button type="submit" disabled={state.submitting}
//         onClick={handelClick}
//         >
//             Submit
//         </button>
//         </form>
     
//      </>
//   );
// }








