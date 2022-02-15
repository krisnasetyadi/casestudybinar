import React,{useEffect, useState} from "react";
import { Table, Button } from "react-bootstrap";
import EditTodo from "./EditTodo";

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
        <h2 className="text-center"> My List </h2>
        <Table striped bordered hover size="sm" >
            <thead>
                <tr className="text-center">
                    <th><h5 ><b>Description</b></h5></th>
                    <th><h5 ><b>Edit</b></h5></th>
                    <th><h5 ><b>Delete</b></h5></th>
                </tr>
            </thead>
            <tbody className="text-center">
                {todos.map(todo=>(
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td><EditTodo todo={todo}/></td>
                        <td><Button variant='danger' onClick={()=>deleteHandler(todo.todo_id)}>Delete</Button></td>

                    </tr>
                )
                )}
            </tbody>
        </Table>
        
        </div>
    )
}