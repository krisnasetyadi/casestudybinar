const router = require('express').Router();
const pool = require('../config/database');
const authorization = require('./utils/authorization');

router.get('/',authorization,async(req,res)=>{
    try {
        const user = await pool.query(
            'SELECT user_name FROM binar_users WHERE user_id = $1',
            [req.user] // req.user = payload
        )
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})
module.exports=router;