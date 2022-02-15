const router = require('express').Router();
const pool = require('../config/database');

router.post('/todos',async(req,res)=>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todos (description) VALUES($1) RETURNING *',
            [description])
        res.status(200).json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
})

router.get('/todos',async(req,res)=>{
    try {
        const allTodos = await pool.query('SELECT * FROM todos');
        res.status(200).json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
})

router.get('/todos/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const todo = await pool.query(
            'SELECT * FROM todos WHERE todo_id = $1',
            [id]);
            res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
})

router.put('/todos/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query(
            'UPDATE todos SET description = $1 WHERE todo_id = $2',
            [description,id]);
            res.json('Todo Updated!')
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
})
router.delete('/todos/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            'DELETE FROM todos WHERE todo_id = $1',
        [id])
        res.json('Todo Deleted')
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
})
module.exports=router;