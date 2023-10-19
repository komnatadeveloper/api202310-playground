const {generateID } = require('../vanilllaJs/generateID');
const { getHourMinSec } = require('../vanilllaJs/getDateInString');
const { updateItemAtIndex } = require('../vanilllaJs/updateItemAtIndex');

let _userList = {};

function addUserToUserList ({
  userId,
  username,
}) {
  _userList[userId] = { username };
}
function removeUserFromUserList ({userId}) {
  _userList[userId] = undefined;
}


let _chatIdList = [];

function addIdToChatList (id) {
  _chatIdList.push(id);
}
function removeIdFromChatList (id) {
  _chatIdList = [ ..._chatIdList ].filter(item => item.socketId !== id);
}

function getIdList () {
  return [..._chatIdList]
}

function getUsernameViaSocketId (id) {
  const user = _chatIdList.find( item => item.socketId === id);
  return user ? user.username : null
}


class ChatMessage  {
  constructor(
    id,
    text,
    time,
    userId,
  ) { 
    this.id = id;
    this.text = text;
    this.time = time;
    this.userId = userId;
  }
}


let _roomsAndUsers = {
  /*
    roomId : {
      userId: true,
    }
  */
}
function handleAddUserToRoom ({
  userId,
  roomId,
}) {
  _roomsAndUsers[roomId] = {
    ..._roomsAndUsers[roomId],
    [userId]: true
  }
}
function isUserIdExistOnRoomId ({
  userId,
  roomId,
}) {
  return _roomsAndUsers[roomId][userId] === true
}

class ChatRoom {
  constructor(
    roomName,
    roomId,
  ) { 
    this.roomName = roomName;
    this.roomId = roomId;
    this.messages = [];
  }
  addMessage ({
    id,
    text,
    time,
    userId,
  }) {
    this.messages.push( 
      new ChatMessage(id, text, time, userId)
    );
  }
}

let _chatRoomList = [
    //👇🏻 Here is the data structure of each chatroom
    // {
    //  id: generateID(),
    //  name: "Novu Hangouts",
    //  messages: [
    //      {
    //          id: generateID(),
    //          text: "Hello guys, welcome!",
    //          time: "07:50",
    //          user: "Tomer",
    //      },
    //      {
    //          id: generateID(),
    //          text: "Hi Tomer, thank you! 😇",
    //          time: "08:50",
    //          user: "David",
    //      },
    //  ],
    // },
];

function getRoomNameViaRoomId (id) {
  const room = _chatRoomList.find( item => item.roomId === id);
  return room.roomName
}
function getRoomIdViaRoomName (name) {
  const room = _chatRoomList.find( item => item.roomName === name);
  return room.roomId
}

function getRoomListToSendSocketClients () {
  return [..._chatRoomList].map(item => ({
    roomName: item.roomName,
    roomId: item.roomId,
    messages: [...item.messages].map(messageItem => ({
      id: messageItem.id,
      text: messageItem.text,
      time: messageItem.time,
      userId: messageItem.userId,
      user: {
        userId: messageItem.userId,
        username: _userList[messageItem.userId].username
      }
    })),
  }));
}

function addRoomToRoomList ({
  roomName,
  roomId,
}) {
  let _room = _chatRoomList.find(item => item.roomName === roomName );
  if ( !_room ) {     
    // _chatRoomList.push(
    //   new ChatMessage(
    //     generateID(),
    //     text,
    //     getHourMinSec(),
    //   )
    // );
    _chatRoomList.push(
      new ChatRoom(
        roomName,
        roomId,
      )
    );
    _roomsAndUsers[roomId] = {};
  }

  return {
    isNewRoomCreated : !_room
  };
}

function addMessageInARoom ({
  message,
  roomId,
  userId,
  time = getHourMinSec(),
  messageId = generateID(),
}) {
  const _roomIndex = _chatRoomList.findIndex(item => item.roomId === roomId);
  const _room = _chatRoomList[_roomIndex];
  _room.addMessage({
    id: messageId,
    text: message,
    time,
    userId,
  });
  console.log('addMessageInARoom ->  _room.messages[_room.messages.length -1] -> ', _room.messages[_room.messages.length -1]);
  updateItemAtIndex({
    array: _chatRoomList,
    index: _roomIndex,
    newItem: _room
  });
  console.log('addMessageInARoom -> _chatRoomList -> ', _chatRoomList);
}






module.exports= {
  addIdToChatList,
  addMessageInARoom,
  removeIdFromChatList,
  getIdList,
  getUsernameViaSocketId,
  getRoomNameViaRoomId,
  getRoomIdViaRoomName,
  getRoomListToSendSocketClients,
  addRoomToRoomList,
  addUserToUserList,
  removeUserFromUserList,
  handleAddUserToRoom,
  isUserIdExistOnRoomId,
}
