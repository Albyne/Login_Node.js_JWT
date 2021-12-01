const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//password
const bcrypt = require('bcrypt');

//validation
const schemaLogin = require('../validations/validations')


router.post('/login', async (req, res) => {

    const { error } = schemaLogin.validate(req.body)

    if (error) {
        return res.status(400).json({error: error.details[0]})
    }
   
    
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: true, message: 'Usuario no encontrado' })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).json({ error: true, message:'contraseña no válida' })
    
   //Token
    const token = jwt.sign({
        name : user.name,
        id : user._id
    }, process.env.TOKEN_SECRET)


    res.header('auth-token').json({
        error: null,
        data: 'EXITOS!!! BIENVENIDOOOO/AAAAAA!!', 
        token: token
    })
})

module.exports = router;