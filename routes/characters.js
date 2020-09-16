const { Router } = require('express')
const Character = require('../models/Character')

const router = Router()

router.get('/', (req, res) => {
	Character.find().then(resp => res.send(resp))
})

module.exports = router
