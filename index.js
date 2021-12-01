const express = require('express')
const mongoose = require ('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const app = express()

//config data body
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//Conection DB
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(()=> console.log('DB CONNECT..'))
.catch(e => console.log('error db:', e))


//Import Routes
const register = require('./routes/register')
const login = require('./routes/login')
const verifyToken = require('./middleware/verify')
const dashboardUser = require('./routes/userDashboard')



//Routes Middlewares
app.use('/api/user', register)
app.use('/api/user', login)
app.use('/api/dashboarduser', verifyToken, dashboardUser)


app.get('/', (req, res)=> { // test
    res.json({
        message: "app on port 3000"
    })
})

//Routes


app.listen(process.env.PORT || 3001 , ()=> {
    console.log('server on port 3000')
})