import React,{useEffect, useState} from "react";
import { Table, Button } from "react-bootstrap";
import EditTodo from "./EditTodo";
import {CgCloseR} from 'react-icons/cg'

export default function ListTodos(){
    const [todos, setTodos] = useState([])
    async function deleteHandler(id){
        try {
            const deleteTodo = await fetch(
                `http://localhost:5000/todo/todos/${id}`,{

                method:'DELETE'})
                console.log(deleteTodo);
                setTodos(todos.filter(todo=>todo.todo_id !== id))
        } catch (err) {
            console.error(err.message);
        }
    }
    async function getTodos(){
        try {
            const response = await fetch('http://localhost:5000/todo/todos')
            const jsonData = await response.json()
            setTodos(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(()=>{
        getTodos()
    },[])
    return(
        <div style={{
            width:"800px",
            margin:'auto',
            marginTop:'50px'
          }}>
        <h2 className="text-center"><b>My Todo List</b>  </h2>
        <Table striped bordered hover size="sm" variant="info" >
            <thead>
                <tr className="text-center">
                    <th><h4 ><b>Description</b></h4></th>
                    <th><h4 ><b>Edit</b></h4></th>
                    <th><h4 ><b>Delete</b></h4></th>
                </tr>
            </thead>
            <tbody className="text-center">
                {todos.map(todo=>(
                    <tr key={todo.todo_id}>
                        <td><b>{todo.description.toUpperCase()}</b></td>
                        <td><EditTodo todo={todo}/></td>
                        <td><Button 
                        variant='danger' 
                        onClick={()=>deleteHandler(todo.todo_id)}>
                            {<CgCloseR style={{width:'25px', height:'25px'}}/>}
                            </Button>
                        </td>

                    </tr>
                )
                )}
            </tbody>
        </Table>
        
        </div>
    )
}