const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', err => console.error('Error', err))
db.once('open', () => console.log('Connected to Database'))
const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length]'))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
	res.send({
		message: 'okay!',
	})
})

app.listen(1953, () => {
	console.log('Listening at port', 1953)
})
