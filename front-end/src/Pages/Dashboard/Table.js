import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Form, Table } from 'react-bootstrap'
import {  Link } from 'react-router-dom';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import PaginatedItems from './Pagination/pagination';
import { Axios } from '../../Api/axios';
import TransformData from '../../helpers/TransformDate';


export default function TableShow(props) {

const currentUser=props.currentUser || {
  name:"",
};

const [search,setSearch]=useState("");
const [date,setDate]=useState(""); 
const [filterData,setFilterData]=useState([]);
const[searchingLoading,setSearchingLoading]=useState(false)

const fiteredDataByDate=date.length !==0 ?props.data.filter(
  (item) =>TransformData(item.created_at) === date
):props.data;

const  filterSearchByDate=date.length !==0 ? filterData.filter(
  (item)=> TransformData(item.created_at) === date
) :filterData;
 const showWhichData=search.length > 0 ? filterSearchByDate :fiteredDataByDate;


// console.log(date)
async function getSearchData(){
  try{
   const res=await Axios.post(`${props.searchLink}/search?title=${search}`);
   setFilterData(res.data)
   console.log(res)
 }catch(err){
   console.log(err)
 }
 finally{
  setSearchingLoading(false)
 }
}

useEffect(()=>{
 const delay= setTimeout(() => {
   search.length > 0 ?  getSearchData() :setSearchingLoading(false); 
  }, 800);
  return ()=> clearTimeout(delay);
},[search])

   

        // Header Show
const headerShow=props.header.map((item,key) =><th key={key} >{item.name}</th> )
        // Body Show
      const dataShow=showWhichData.map((item,key) =>(
    <tr  key={key}>
        <td>{item.id}</td>
        {
            props.header.map((item2,key2)=> (
            <td key={key2}>
                {item2.key  ==="image" ? (<img  width="50px"  src={item[item2.key]} alt='notFound' />) 
                : item2.key === "images" ? (
                    <div className='d-flex align-items-center justify-content-start gap-2 flex-wrap'>
                      {item[item2.key].map((im)=>(
                        <img  width="50px" src={im.image} alt=''/>
                      ))}
                    </div>
                ) 
                 :item2.key === "created_at" || item2.key === "updated_at" ?(TransformData(item[item2.key]))
                 :  item[item2.key]  === '1995' ?
                 "Admin" : item[item2.key]=== "2001" ? "User" 
                 :item[item2.key]==="1996" ?"Writer" 
                  :item[item2.key]==="1999" ? "Publisher Manger "
                  :item[item2.key]}
               { currentUser && item[item2.key] === currentUser.name && "(You)" }
            </td>))
        }
        <td>
          <div className='d-flex align-items-center gap-2'>
             <Link to={`${item.id}`}><FontAwesomeIcon  fontSize = {'19px'} icon={faPenToSquare} /> </Link>
             {currentUser.name !== item.name &&
              <FontAwesomeIcon 
               onClick={()=>props.delete(item.id)} 
               fontSize={'19px'} color='red'  icon={faTrash} /> }
          </div>   
        </td>
    </tr> ));

    // Return Data
  return (
   <>
   <div className='col-3'>
      <Form.Control 
        type="search" 
        aria-label='input example' 
        placeholder='search' 
        className='my-2'
        onChange={(e)=>{
          setSearch(e.target.value);
          setSearchingLoading(true)
        }}
      />
   </div>
   <div className='col-5'>
      <Form.Control 
        type="date" 
        aria-label='input example' 
        placeholder='search' 
        className='my-2'
        onChange={(e)=>{
          setDate(e.target.value);
          // setSearchingLoading(true)
        }}
      />
   </div>
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>Id</th>
        {headerShow}
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {props.loading  ? (<tr className='text-center'>
        <td colSpan={12}>Loading ...</td>
      </tr>) : searchingLoading ?(
      <tr className='text-center'>
        <td colSpan={12}>Loading ...</td>
      </tr>
      ):(dataShow) }
      
    </tbody>
  </Table>
 <div className='d-flex align-items-center  justify-content-end flex-wrap'> 
     <div className='col-1'>
      <Form.Select onChange={(e)=> props.setLimit(e.target.value)} aria-label="Default select example">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </Form.Select>
     </div>
       <PaginatedItems  total={props.total} setPage={props.setPage} itemsPerPage={props.limit} data={props.data}/>
   </div>
  
   
   </>
  )
}
