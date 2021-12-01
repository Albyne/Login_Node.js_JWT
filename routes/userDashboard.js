

const router = require('express').Router()

router.get('/', (req, res)=>{
    res.json({
        error: null,
        data: {
            title: 'Estas en la cuenta del usuarioooooooooo!!',
            user: req.user //
        }
    })
})

module.exports = router