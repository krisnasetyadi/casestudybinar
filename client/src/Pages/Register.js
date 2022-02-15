import React,{ useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';

export default function Register({setAuth}) {
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");

  async function submitHandler(e){
    e.preventDefault()
    try {
      const body = {email,name,password}
      const response = await fetch('http://localhost:5000/auth/register',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(body)
      })
      const parseResponse = await response.json();
      if(parseResponse.token){
        localStorage.setItem('token',parseResponse.token)
        setAuth(true)
        toast.success('Register Successfully')
      } else {
        setAuth(false)
        toast.error(parseResponse)
      }

    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div className="regist">
      <Form onSubmit={submitHandler}  style={{
            width:"300px",
            margin:'auto'
          }}>
          <h1 className='text-center my-3'>Register</h1>
        <Form.Group>
          <Form.Label><b>Username</b></Form.Label>
          <Form.Control 
         
          className='my-2'
          type="text" 
          value={name} 
          onChange={(e=>setName(e.target.value))}
          placeholder="Username"
          required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label><b>Email</b></Form.Label>
          <Form.Control 
         
          className='my-2'
          type="text" 
          value={email} 
          onChange={(e=>setEmail(e.target.value))}
          placeholder="Email"
          required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label><b>Password</b></Form.Label>
          <Form.Control 
          className='my-2'
          type='password' 
          placeholder='Password' 
          value={password} 
          onChange={(e=>setPassword(e.target.value))}
          required
          />
        </Form.Group>
        <div className='text-center'
        style={{marginTop:'10px'}}>
        <Button variant="success" 
        className='my-2 btn-success btn-block' 
        type='submit'>Register</Button>
        </div>
        <p className='text-center' style={{marginTop:'10px'}}>Have an account ? click here ! <Link to='/login'> Login</Link></p>
      </Form>
      
    </div>
  );
}
