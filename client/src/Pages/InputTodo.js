import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import ListTodos from './ListTodo';
import {CgAddR} from 'react-icons/cg';
import {Link} from 'react-router-dom';
import {BsFillCaretLeftFill} from 'react-icons/bs'

export default function InputTodo({setAuth}){
    const [description,setDescription] = useState('');

    async function submitHandler(){
        
        try {
            const body = {description}
            const response = await fetch(
                'http://localhost:5000/todo/todos',{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(body)
                });
            response.json()
        } catch (err) {
            console.error(err.message);
        }
    }
    return(
        <>
        
        <h1 className='text-center my-4'> <b>Todo List</b> </h1>
        <Form className='d-flex mt-3' onSubmit={submitHandler} style={{
            width:"400px",
            margin:'auto'
          }} >
            <Form.Control 
            type='text' 
            value={description}
            onChange={e=>setDescription(e.target.value)}
            />
            <Button variant='success' type='submit' style={{marginLeft:'10px'}}>
                <CgAddR style={{width:'25px',
            height:'25px'}}/>
            </Button>
        </Form>
        <ListTodos/>
        <Link to='/dashboard'> 
        <BsFillCaretLeftFill 
        style={{width:'100px',height:'80px'}}/> 
        </Link>
        </>
    )
}