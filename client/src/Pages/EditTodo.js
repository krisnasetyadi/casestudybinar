import React,{useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function EditTodo(todo){
    const [show,setShow] = useState(false);
    const [description, setDescription] = useState(todo.description);
    const handleShow = ()=> setShow(true);
    const handleClose = () => setShow(false);

    function updateDescription(e){
        e.preventDefault()
        try {
            
        } catch (err) {
            console.error(err.message);
        }
    }
    return(
        <>
        <Button variant="primary" onClick={handleShow} 
        data-target={`#id${todo.todo_id}`}>
            Edit
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