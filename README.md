# Awesome Project Build with Sequelize

Steps to run this project:

1. Run `node server/index.js` command


# Socketio를 이용한 채팅 클라이언트 
    npm install express socket.io
    npm install -D nodemon
    메인화면 및 채팅화면 그리기

# Express App에 Socket io 연동하기
    express 서버에 socketio를  어떻게 연동해볼지


    //expres에 sockio 연동하기
    const http = require('http'); //우선 http모듈을 만들고
    const server = http.createServer(app); //createServer에 express인 app을 넣어준다
    const {Server} = require('socket.io');
    const io = new Server(server); // 연동완료 이제 express 서버에서 socket io사용가능

# 기능 구현 시작
    join 이벤트를 통해 유저를 유효성 체크후 통과시 입장시킨다

    특정방에 입장시 나와 다른사람에게 환영메세지 다르게 보이게 하기 
    
    socket.broadcast.to(룸이름).emit 본인을 제외한 모두에게

    io.to.emit 을 이용해 해당 방에 있는 전원에게 이벤트를 보낸다

# 채팅방 입장시 화면 구현
    mustache 템플릿 엔진 이용
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>

# 채팅방에서 메세지 보내기 구현
    html에 메세지 입력 input이랑 전송 button 추가
    메세지 입력후 전송시 서버에서 io.to(방).emit으로 해당 방의 전원에게 메세지 보내고 받아서 표현한다
    
# 채팅방 나가기
    users 배열에서 나간 유저의 index로 찾아서 해당 유저를 splice해주고
    io.to(방).emit으로 해당 방의 전원에게 유저가 나갔다고 메세지를 전송해주고 getUsers를 통해 해당 방의 유저를 다시 가져온다

