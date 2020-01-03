const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})




server.listen(8000, () => console.log('server is running on port 8000'))