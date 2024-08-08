import { useState } from "react";
import { Link } from "react-router-dom";
export default function Cours (props) {
        const handelClick = () => {
                props.handelId(props.id);
                localStorage.setItem("id",props.id)
}
    return(<>
            <div className="cousrs">
                <div className="img">
                        <img src={props.img} alt="img"/>
                </div>
                 <h4>{props.teacher}</h4>
                 <h3>{props.title}</h3>
                    <Link to="/cours" onClick={handelClick}>Open Course</Link>
            </div>
        
        </>)
}