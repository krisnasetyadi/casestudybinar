import React,{ useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import {FcTodoList} from 'react-icons/fc';

export default function Dashboard({setAuth}) {
  const [name,setName]=useState("")

  async function getName(){
    try {
      const response = await fetch(
        'http://localhost:5000/dashboard/',{
        method:"GET",
        headers:{token:localStorage.token}
        })
        const parseResponse = await response.json()
        setName(parseResponse.user_name)
    } catch (err) {
      console.error(err.message)
    }

  }
  function logout(e){
    e.preventDefault()
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Successfully Logout');
  }
  useEffect(()=>{
    getName()
  },[])
  return (
    <div className='text-center'>
      <h1><b>Welcome Back, {name.toUpperCase()}</b></h1>
      <div style={{marginTop:'50px'}} >
      <Link to='/todo-list'>
        <FcTodoList style={{width:'100px', height:'100px'}}/>
        </Link>
        <h6>Click this <u><b>icon</b></u> to Make a List</h6>
      </div>
        <Button
        style={{marginTop:'50px'}}
        variant='warning'
         onClick={e=>logout(e)}>
           <b>Logout</b>
         </Button>
    </div>
  );
}
