const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')

app.use(express.json())
app.use(cors())

// routes
app.use('/dashboard',require('./routes/dashboard'));
app.use('/auth',require('./routes/auth'));
app.use('/todo',require('./routes/todo'));

app.listen(PORT,()=> console.log(`Your server is running on PORT ${PORT}`))