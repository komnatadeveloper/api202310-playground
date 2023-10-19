


const { generateID } = require('../vanilllaJs/generateID');
const { getHourMinSec } = require('../vanilllaJs/getDateInString');
const { 
  addIdToChatList,
  removeIdFromChatList, 
  getIdList, 
  getUsernameViaSocketId, 
  addRoomToRoomList, 
  getRoomListToSendSocketClients, 
  addMessageInARoom, 
  addUserToUserList, 
  getRoomNameViaRoomId,
  getRoomIdViaRoomName,
  handleAddUserToRoom,
  isUserIdExistOnRoomId,
} = require('./handleChatList');


async function socketIoManage ( server ) {
  const socketIO = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
        // origin: "http://localhost:3000/chat/"
        // origin: "http://localhost:3000/chat/"
        // origin: "*"
    }
  });


  // authentication documentation ->  https://socket.io/docs/v4/middlewares/
  // SOCKET.IO AUTHENTICATION MIDDLEWARE
  socketIO.use((socket, next) => {
    console.log('Socket.io middleware')
    // console.log('socket.request -> ', socket.request)
    // console.log('socket.request._query -> ', socket.request._query)
    // console.log('socket.request._query.token -> ', socket.request._query.token)
    console.log('socket.request._query.username -> ', socket.request._query.username)
    // following "_verify" method is your verification. Imagine :)
    const _verify = () => { return true; }
    if ( _verify() ) {
      next();
    } else {
      next(new Error("I didnt like your Authentication Parameters. Invalid!"));
    }
  });

  //Add this before the app.get() block
  socketIO.on('connection', (socket) => {
    // console.log('socket.data -> ', socket.data)
    // console.log('socket.request -> ', socket.request)
    // console.log('socket.request._query -> ', socket.request._query)
    const username = socket.request._query.username;
    console.log(`⚡: ${socket.id} user just connected!`, ' username -> ', username);
    addIdToChatList({
      socketId: socket.id,
      username
    })
    addUserToUserList({
      userId: socket.id,
      username
    });
    console.log('total connected socket count -> ', getIdList().length);

    socket.emit('existingRoomList', getRoomListToSendSocketClients());


    // tell other users user list
    socketIO.emit('newUserResponse',  getIdList());



    socket.on('createRoom', (roomName) => {
      console.log(`socket.on('createRoom', (roomName) -> `, roomName, );
      const { isNewRoomCreated } = addRoomToRoomList({
        roomId: generateID(),
        roomName,
      })

      if ( isNewRoomCreated ) {
        socketIO.emit('existingRoomList', getRoomListToSendSocketClients());
      }
      
      console.log(`socket.on('createRoom', (roomName) -> `, roomName, 'username -> ', getUsernameViaSocketId(socket.id));
      // handleAddUserToRoom,
     //   isUserIdExistOnRoomId,
      if ( 
        isUserIdExistOnRoomId({
          userId: socket.id,
          roomId: getRoomIdViaRoomName(roomName)
        }) === false
      ) {
        socket.join(roomName);
      }
    });

    socket.on(
      'newMessageOnRoom', 
      ({
        roomId,
        message
      }) => {
        const time = getHourMinSec();
        const messageId = generateID();
        addMessageInARoom({
          message,
          roomId,
          userId: socket.id,  
          time,    
          messageId,
        });
        const _roomListToSendSocketClients = getRoomListToSendSocketClients();
        console.log(_roomListToSendSocketClients[0].messages[0])
        console.log(`socket.on('newMessageOnRoom', _roomListToSendSocketClients -> `, _roomListToSendSocketClients,);
        // socketIO.emit('existingRoomList', getRoomListToSendSocketClients());
        const roomName = getRoomNameViaRoomId(roomId);
        socketIO.to( roomName ).emit(
          'newMessageOnRoom',
          {
            roomId,
            user: {
              userId: socket.id,
              username: getUsernameViaSocketId(socket.id),
            },
            message,
            time,
            messageId,
          }
        )
      }
    )

    



    socket.on('message', (data) => {
      console.log(`socket.on('message', (data) -> `, data);
      socketIO.emit('messageResponse', data);
    });

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      console.log('username -> ', getUsernameViaSocketId(socket.id));
      removeIdFromChatList(socket.id)
      if ( getIdList().length > 0 ) {
        // tell other users user list
        socketIO.emit('newUserResponse',  getIdList());
      }
      console.log('total connected socket count -> ', getIdList().length)
    });
  });
}


module.exports = { socketIoManage }