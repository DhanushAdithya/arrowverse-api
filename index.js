const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send({
        message: 'okay!'
    })
})

app.listen(1953, () => {
    console.log('Listening at port', 1953)
})