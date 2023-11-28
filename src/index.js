const express = require('express');
const app = express();
const path = require('path');

//expres에 sockio 연동하기
const http = require('http');
const server = http.createServer(app); //createServer에 express인 app을 넣어준다
const {Server} = require('socket.io');
const { generateMessage } = require('./utils/messages');
const { getUsersInRoom, addUser, getUser, removeUser } = require('./utils/users');
const io = new Server(server); // 연동완료 이제 express 서버에서 socket io사용가능

io.on('connection', (socket) => {
    console.log('socket', socket.id);

    
    socket.on('join', (options, callback) => {
        //에러가 있으면 에러를 리턴 없으면 유저를 리턴하는 addUser 함수
        console.log(options)
        const {error, user} = addUser({id: socket.id, ...options})

        if(error) {
            return callback(error);
        }
        console.log('user.room::'+user.room);
        socket.join(user.room);

        //본인에게 메세지지
        socket.emit('message', generateMessage('Admin', `${user.room} 방에 오신 걸 환영합니다.`))
        //본인을 제외한 모두에게 메세지
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username}가 방에 참여했습니다`))

        //참여한 방의 모든 유저들에게 roomData라는 이벤트를 보낸다
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
    })

    socket.on('sendMessage', (message, callback) => {
        console.log('dddddd');
        const user = getUser(socket.id);

        io.to(user.room).emit('message', generateMessage(user.username, message));

        callback();
    })

    socket.on('disconnect', () => {
        console.log('socket disconnect', socket.id)
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username}가 방을 나갔습니다.`));
            io.to(user.romm).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

const publicDirectoryPath = path.join(__dirname,'../public');

app.use(express.static(publicDirectoryPath));

const port = 4000;


server.listen(port, () =>{
    console.log('Server is an port 4000 Running');
});
