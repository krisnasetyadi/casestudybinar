const router = require('express').Router();
const pool= require('../config/database');
const bcrypt = require('bcrypt');
const jwtGenerator = require('./utils/jwtGen');
const validData = require('./utils/validation');
const authorization = require('./utils/authorization');

router.post('/register',validData,async(req,res)=>{
    try {
        const {email,name,password} = req.body;
        const user = await pool.query('SELECT * FROM binar_users WHERE user_email = $1',[
            email
        ])
        if(user.rows.length !== 0 ){
            return res.status(401).json('User already exist')
        }
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password,salt);
        const newUser = await pool.query(
            'INSERT INTO binar_users(user_name,user_email,user_password)VALUES($1,$2,$3) RETURNING *',
            [name,email,bcryptPassword])
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token})
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
    
})

router.post('/login',validData,async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await pool.query(
            'SELECT * FROM binar_users WHERE user_email = $1',
            [email]
        )
        if(user.rows.length === 0){
            return res.status(401).json('Password or Email is incorrect!');
        }
        const validPassword = await bcrypt.compare(password,user.rows[0].user_password);
        if(!validPassword){
            return res.status(401).json('Password or Email is incorrect!')
        }
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
        
    }
})

router.get('/verified',authorization,async(req,res)=>{
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports=router;