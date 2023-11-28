const users = [];

const addUser = ({ id, username, room }) => {

    console.log('username:::'+ username);
    username = username.trim();
    room = room.trim();

    if(!username || !room){
        return {
            error: '사용자이름과 방이름이 필요합니다'
        }
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    }) 

    if(existingUser) {
        return {
            error: '해당 방에 이미 입장한 유저입니다'
        }
    }

    //유저 배열에 저장
    const user = { id, username, room }
    users.push(user)

    return {user};

}

const getUsersInRoom = (room) => {
    room = room.trim();
    //해당 방에 있는 유저들을 리턴해준다.
    return users.filter(user => user.room === room);
}

const getUser = (id) => {
    return users.find(user => user.id === id);
}

const removeUser = (id) => {
    //지우려고 하는 유저 찾기
    const index = users.findIndex((user) => user.id = id);
    //있으면 지우기
    if(index !== -1) {
        return users.splice(index,1)[0];
    }
}

module.exports = {
    addUser,
    getUsersInRoom,
    getUser,
    removeUser
}