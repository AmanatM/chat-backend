const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

let onlineUsers = []

const userCount = () => {
    io.emit('user count', onlineUsers.length)
}

app.post('/login', (req, res) => {
    const user = req.body
    res.json(user)
    onlineUsers.push(user)
    userCount()
})


app.get('/onlineUsers', (req, res) => {
    res.json({onlineUsers: onlineUsers.length})
})

app.post('/newMsg', (req, res) => {
    const msg = req.body
    res.json(msg)
    console.log(msg)
    io.emit('new msg', msg)
})


io.on('connection', socket => {
    
    socket.on('disconnect', () => {
        onlineUsers.pop()
        userCount()
    })

    socket.on('logout', (data, fn) => {
        onlineUsers.pop()
        userCount()
    })
    
})


server.listen(8000, () => console.log('server is running on port 8000'))