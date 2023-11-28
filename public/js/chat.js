const socket = io();

console.log(socket);

//브라우저상의 url상의 querystring을 가져온다
const query = new URLSearchParams(location.search);

const username = query.get('username');
const room = query.get('room');

//채팅방 입장시 위에서 얻어낸 유저이름과 방이름을 서버에 join이벤트로 보내준다
socket.emit('join', {username, room}, (error) =>{
    if(error) {
        alert(error);
        location.href = '/';
    }
});

const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;


socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })

    document.querySelector('#sidebar').innerHTML = html;
})

const messages = document.querySelector('#messages');
const messageTemplate = document.querySelector('#message-template').innerHTML;
console.log('messages::'+messages);

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })

    messages.insertAdjacentHTML('beforeend', html);

    scrollToBottom();
})


function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
}



const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const messageFormButton = messageForm.querySelector('button');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageFormButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        messageFormButton.removeAttribute('disabled');
        messageFormInput.value = '';
        messageFormInput.focus();

        if(error) {
            return console.log(error);
        }
    })

})