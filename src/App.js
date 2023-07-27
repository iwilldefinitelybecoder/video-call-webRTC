import React, { useRef, useState, useEffect, createContext } from "react";
import Call from "./videoCall/calling/Call";
import Recieve from "./videoCall/receiving/Recieve";
import Peer from "simple-peer";
import io from "socket.io-client";
import { v4 } from "uuid";

export const values = createContext();

const soc = io.connect("http://localhost:5000");
function App() {
  const [display, setDisplay] = useState(false);
  const [stream, setStream] = useState();
  const [container, setContainer] = useState(false);
  const [call, setCall] = useState(false);
  const [recieve, setRecieve] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [caller, setCaller] = useState("");
  const [reciever, setReciever] = useState("");
  const [users, setUsers] = useState([]);

  const connectionRef = useRef();
  const myVideo = useRef();
  const userVideo = useRef();
  const socket = useRef();

  socket.current = soc;

  useEffect(() => { 
    const uuid = v4();
    setCaller(uuid); 
  },[])

  useEffect(() => {
   socket.current.emit('uuid',{caller}) 
    console.log(caller)
   },[caller])


  useEffect(() => {
    socket.current.io.on("me", (socket) => {
      console.log(socket)
      setCaller(socket);
    })
   
    socket.current.on("callUser", (data) => {

      setRecieve(true);
      setContainer(true);
      setReciever(data.from)
      // setName(data.name)
      setCallerSignal(data.signal);
    });
  }, []);

  useEffect(() => {
    socket.current.on("Users", () => {
      setUsers(users);
      console.log(caller)
      
    })
  },[])
  useEffect(() => {
    socket.current.on("callDeclined", () => {
      setCall(false);
      setRecieve(false);
      setCallAccepted(false);
    });
  }, []);

  const callUser = (id) => {
    setContainer(true);
    setCall(true);
    setRecieve(false);
    console.log("calling");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        acknowledge: caller,
        signalData: data,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      console.log(callAccepted)
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const declineCall = () => {
    setCall(false);
    setRecieve(false);
    setContainer(false);

    socket.current.emit("declineCall", { to: caller });
  };


  
  const answerCall = () => {
    console.log("callaccepted");
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: reciever });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setContainer(true);
    // connectionRef.current.destroy();
    console.log("callended");
  };

  return (
    <>
      <values.Provider
        value={{
          setContainer,
          setCall,
          setRecieve,
          setStream,
          stream,
          setDisplay,
          display,
          container,
          myVideo,
          userVideo,
          answerCall,
          callAccepted,
          setCallAccepted,
          leaveCall,
        }}
      >
        {recieve ? !call ? <Recieve /> : null : null}

        {call ? !recieve ? <Call /> : null : null}
        <button onClick={() => callUser(caller)}>call</button>
        <input type="text" placeholder="enter id" onChange={(e)=>setCaller(e.target.value)}/>
        {
          users?.map((user) => {
            return (
              <div>
                <button onClick={() => callUser(user.socketId)}>call</button>
              </div>
            )
          } 
        )}
      </values.Provider>
    </>
  );
}

export default App;
