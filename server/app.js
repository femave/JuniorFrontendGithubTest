const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()


const PORT = 1337


app.use(express.static(path.join(process.cwd(), 'client')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.json({
        succes: true
    })
  })

app.listen(PORT)
console.log(`Listening at port ${PORT}`)