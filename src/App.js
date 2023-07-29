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
      const [callAccepted, setCallAccepted] = useState(false);
      const [callerSignal, setCallerSignal] = useState();
      const [caller, setCaller] = useState([]);
      const [reciever, setReciever] = useState("");
      const [uuid, setUuid] = useState("");
      const [users, setUsers] = useState([]);
      const [value, setValue] = useState();

      const connectionRef = useRef();
      const myVideo = useRef();
      const userVideo = useRef();
      const socket = useRef();

      socket.current = soc;

      useEffect(() => {
        const uuid = v4();
        setUuid(uuid);
      }, []);

      useEffect(() => {
        socket.current.emit("uuid", { uuid });
        socket.current.on("me", (data) => {
          console.log(data.socketId, data.uuid);
          setCaller({ socketId: data.socketId, uuid: data.uuid });
        });
      }, [uuid]);

      useEffect(() => {
        socket.current.on("callUser", (data) => {
          console.log('receving call');
          if (!call && !recieve) {
            setRecieve(true);
            setContainer(true);
            setReciever(data.from);
            // setName(data.name);
            setCallerSignal(data.signal);
            setRecieve(true);
          } else {
            socket.current.emit("busy", {
              to: data.acknowledge,
              from: caller.socketId,
              name: caller.uuid,
            });
          }
        });
      }, []);

      useEffect(() => {
        socket.current.on("Users", () => {
          setUsers(users);
          console.log(users);
        });
      }, []);
      useEffect(() => {
        socket.current.on("callDeclined", () => {
          setCall(false);
          setRecieve(false);
          setCallAccepted(false);
        });
      }, []);

      useEffect(() => {
        socket.current.on("callEnded", () => {
          setContainer(false);
        setDisplay(false);
        setCall(false);
        setRecieve(false);
        connectionRef.current.destroy();
        console.log("callended");
        } ) 
      },[]);

      const callUser = (value) => {
        console.log(caller);
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
            userToCall: value,
            acknowledge: caller.socketId,
            signalData: data,
            name: caller.uuid,
          });
        });
        peer.on("stream", (stream) => {
          userVideo.current.srcObject = stream;
        });

        socket.current.on("callAccepted", (signal) => {
          setCallAccepted(true);
          setDisplay(true);
          peer.signal(signal);
        });

        socket.current.on("busy", (data) => {
          setCall(false);
          setRecieve(false);
          setCallAccepted(false);
          setValue(" ");
          console.log("busy");
          return;
        });

        connectionRef.current = peer;
      };
      console.log(callAccepted);
      const declineCall = () => {
        setCall(false);
        setRecieve(false);
        setContainer(false);

        socket.current.emit("declineCall", { to: caller });
      };

      const answerCall = () => {
        if (!call && recieve) {
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
        }
      };

      const leaveCall = () => {
        socket.current.emit("callEnded",{from:caller.socketId,to:reciever})
        setContainer(false);
        setDisplay(false);
        setCall(false);
        setRecieve(false);
        connectionRef.current.destroy();
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
              caller,
              reciever,
            }}
          >
            {recieve ? !call ? <Recieve /> : null : null}

            {call ? !recieve ? <Call /> : null : null}
            <button onClick={() => callUser(value)}>call</button>
            <input
              type="text"
              placeholder="enter id"
              onChange={(e) => setValue(e.target.value)}
            />
            {users?.map((user) => {
              return (
                <div>
                  <button onClick={() => callUser(user.socketId)}>call</button>
                </div>
              );
            })}
          </values.Provider>
        </>
      );
    }

    export default App;
