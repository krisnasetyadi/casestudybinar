import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import ListTodos from './ListTodo';

export default function InputTodo({setAuth}){
    const [description,setDescription] = useState('');

    async function submitHandler(e){
        e.preventDefault()
        try {
            const body = {description}
            const response = await fetch(
                'http://localhost:5000/todo/todos',{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(body)
                });
            const res = await response.json();
            res ? toast.success('Successfully Added') : toast.error('Internal Server Error!')
        } catch (err) {
            console.error(err.message);
        }
    }
    return(
        <>
        <h1 className='text-center mt-5'> Todo List </h1>
        <Form className='d-flex mt-5' onSubmit={submitHandler} style={{
            width:"300px",
            margin:'auto'
          }} >
            <Form.Control 
            type='text' 
            value={description}
            onChange={e=>setDescription(e.target.value)}
            />
            <Button variant='success ml-3' type='submit'>
                Add
            </Button>
        </Form>
        <ListTodos/>
        </>
    )
}