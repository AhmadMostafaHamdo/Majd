import { useState } from 'react';
import { data } from '../../Api/advices';
import Cours from './Cours';
import Nav from './Navbar';
import Footer from './Footer';
export default function AllCours() {
    const [id, setId] = useState(0);
    const handelId = (id) => {
        setId(id);
    }

    const dataShow = data.map((ele, index) => <Cours key={index} img={ele.img} id={ele.id}
        title={ele.desc} teacher={ele.name} handelId={ handelId} />)
    return (<>
        <Nav/>
       <div className='all-cours'>
            {dataShow}
        </div>
        <Footer/>
    </>
    );
};