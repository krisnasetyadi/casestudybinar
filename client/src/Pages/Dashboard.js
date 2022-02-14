import React,{ useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import { toast } from 'react-toastify';

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
        // console.log(parseResponse)
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
    <>
      <h1>Dashboard {name}</h1>
      <Button variant='primary' onClick={e=>logout(e)}>Logout</Button>
    </>
  );
}
