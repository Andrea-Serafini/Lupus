import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Peer } from 'peerjs';

const socket = io('http://localhost:8080');

var peerId;
const peer = new Peer();
peer.on('open', function (id) {
  peerId = id;
  console.log('My peer ID is: ' + id);
});

peer.on("connection", (conn) => {

  conn.on("data", (data) => {
    console.log(data);
  });

});

const connections = []

function connectPeer(newPeer) {
  var conn = peer.connect(newPeer);
  conn.on("open", () => {
    connections.push(conn);
    conn.send("Hi! I'm " + peerId);
  });

}


socket.on("peers_list", (message) => {
  console.log("peers_list")
  connectPeer(message)
  console.log(message)
});

socket.on("new_peer", (message) => {
  console.log("new_peer")
  connectPeer(message)
  console.log(message)
});

function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("bo", (data) => {
      setMessages((messages) => [...messages, data]);
    })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && password) {
      console.log(name + " " + password);
      connections.forEach((conn) => {
        conn.send({ name, password });
      })

      setName('');
      setPassword('');
    }
  };

  const handleRoom = (event) => {
    event.preventDefault();
    if (room) {
      socket.emit('room', { name: room, id: peerId });
      setRoom('');
    }
  };

  const handlePlay = (event) => {
    event.preventDefault();
    console.log("Play");
    socket.emit('play', true);
  };


  return (
    <div>
      <form onSubmit={handleRoom}>
        <input type="text" value={room} placeholder="Room name" onChange={(event) => setRoom(event.target.value)} />
        <button type="submit">Enter</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input type="text" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
        <input type="text" value={password} placeholder="Your password" onChange={(event) => setPassword(event.target.value)} />
        <button id="room" type="submit">Send</button>
      </form>

      <button id="play" onClick={handlePlay}>Play</button>

      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.name}: {message.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;