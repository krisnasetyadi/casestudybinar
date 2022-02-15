import React,{useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {BsPencilSquare} from 'react-icons/bs';

export default function EditTodo({todo}){
    const [show,setShow] = useState(false);
    const [description, setDescription] = useState(todo.description);
    const handleShow = ()=> setShow(true);
    const handleClose = () => setShow(false);

    async function updateDescription(e){
        e.preventDefault()
        try {
            const body = {description};
            const response = await fetch(
                `http://localhost:5000/todo/todos/${todo.todo_id}`,{

                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            response.json()
            window.location='/todo-list';
        } catch (err) {
            console.error(err.message);
        }
    }
    return(
        <>
        <Button variant="warning" onClick={handleShow} 
        data-target={`#id${todo.todo_id}`}>
            {<BsPencilSquare style={{width:'25px', height:'25px'}}/>}
        </Button>

        <Modal show={show} onHide={handleClose}
        id={`id${todo.todo_id}`} >
            <Modal.Header closeButton>
                <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control 
                type='text'
                value={description}
                onChange={(e=>setDescription(e.target.value))}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={e=>updateDescription(e)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}