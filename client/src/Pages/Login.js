import React,{ useState } from 'react';
import {Form,Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Login({setAuth}) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")

  async function submitHandler(e){
    e.preventDefault()
    try {
        const body = {email,password};
        const response = await fetch(
            'http://localhost:5000/auth/login',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(body)
        })
        const parseResponse = await response.json();
        // console.log(parseResponse);
        if(parseResponse.token){
            localStorage.setItem('token',parseResponse.token);
            setAuth(true);
            toast.success('Successfully Login');
        } else {
            setAuth(false);
            toast.error(parseResponse);
        }
    } catch (err) {
        console.error(err.message)
    }
  }
  return (
    <>
      <Form onSubmit={submitHandler} style={{
            width:"300px",
            margin:'auto'
          }}>
          <h1 className='text-center my-3'>Login</h1>
        <Form.Group className='my-3'>
          <Form.Label><b>Email</b></Form.Label>
          <Form.Control 
          style={{
            width:"300px"
          }}    
          type="text" 
          value={email}
          placeholder="email"
          className="my-2" 
          onChange={(e=>setEmail(e.target.value))}
          required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label><b>Password</b></Form.Label>
          <Form.Control 
          type='password' 
          placeholder='Password'
          className="my-2" 
          value={password} 
          onChange={(e=>setPassword(e.target.value))}
          style={{
            width:"300px"
          }}
          required
          />
        </Form.Group>
        <div className='my-3 text-center'>
        <Button 
        variant="success" 
        className="btn-block" 
        type="submit">
          Login
          </Button>
        </div>
        <p>Haven't an account ? click here! <Link to='/register'>Register</Link> </p>
      </Form>
    </>
  );
}
