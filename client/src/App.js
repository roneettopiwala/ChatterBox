import io from 'socket.io-client';
import Login from './Login';
import { useEffect, useState, useRef } from "react";
import ChangeRoom from "./ChangeRoom";

const socket = io.connect("http://localhost:3001");


function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const lastMessageRef = useRef();
  const [showChangeRoom, setShowChangeRoom] = useState(false);  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleRecieve = (data) => {
      setMessages((prevMessages)=>{
          return [...prevMessages, data];

      });
    };
    socket.on("receive_message", handleRecieve);

    return() =>{
      socket.off("receive_message", handleRecieve);
    };
  },[]);

  const handleIdSubmit = (id) =>{
    setName(id);
    setIsLoggedIn(true);
    
  }

  const joinRoom = (room) => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    if(message.trim()!== ""){
      const messageData = {
        author:name,
        message: message,
        room: room

    };

    socket.emit("send_message", messageData);
    const newMessages = [...messages, messageData];
    setMessages(newMessages);
    saveMessages(room, newMessages)
    setMessage("");
  }
  };


  const handleRoomSubmit = (newRoom) =>{
    setRoom(newRoom);
    joinRoom(newRoom);
    loadMessages(newRoom);
    setShowChangeRoom(false);

  }

  useEffect(()=>{
    if(lastMessageRef.current){
      lastMessageRef.current.scrollIntoView({behaviour: "smooth"})
    }
  }, [messages]);

  const saveMessages = (room, messages) =>{
    localStorage.setItem(`messages_${room}`, JSON.stringify(messages) );
  }

  const loadMessages = (room) =>{
    const savedMessages = localStorage.getItem(`messages_${room}`)

    if (savedMessages){
      setMessages(JSON.parse(savedMessages));
    } else{
      setMessages([]);
    }
  };

  if(!isLoggedIn){
    return<Login onIdSubmit ={handleIdSubmit} onRoomSubmit={handleRoomSubmit} />;
  }
  return (
    <div class="d-flex flex-column mx-1" > 
      {showChangeRoom ? (
        <ChangeRoom changeRoomSubmit={handleRoomSubmit}/>
      ) : (
      
      <div class="flex-grow-1 overflow-auto mx-1  " style={{marginTop: '87vh', marginBottom: '5.5vh'}} >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex  mb-2 ${
                msg.author === name
                  ? 'justify-content-end  ' 
                  : 'justify-content-center'
              }`}
            >
            <div
            className={`rounded px-2 py-2 ${msg.author === name
                  ? 'bg-primary text-white'
                  : 'border'}`}
            ref={index === messages.length -1 ? lastMessageRef : null}
              >
              <b>{msg.author === name ? 'You: ' : `${msg.author}: `}</b>
              {msg.message}
              </div>
            </div>
          ))}
          <div class="input-group mb-1  fixed-bottom align-items" style ={{right:'0', left: 'auto', bottom: '0', width: '56.1%'}}>
            <input
              type="text"
              class="form-control"  
              placeholder="Message..."
              aria-label="Message"
              aria-describedby="button-send"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
            <button
              class="btn btn-primary"
              type="button"
              id="button-send"
              onClick={sendMessage}
            >
            Send Message
          </button>
          <div class = "fixed-top" style ={{right:'auto', left: '0', bottom: '0'}} >
            <div id = "buttonContainer">
            <button
              type = "button"
              class= "btn btn btn-outline-danger"
              id = "editButton"
              onClick = {() => setShowChangeRoom(true)}
            >
              <i class = "fa fa-bug"> </i>Change Room
            </button>
              </div>
          </div>
        </div>
        </div>
      )}
      </div>
        
        );
      }


    export default App;