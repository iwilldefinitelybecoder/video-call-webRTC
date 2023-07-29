import React, { useState, useRef, useEffect, useContext } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { MdCall, MdCallEnd } from "react-icons/md";
import {
  BsMicMuteFill,
  BsMicFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
} from "react-icons/bs";

import "./call.css";
import "../receiving/recieve.css";
import CallDeclined from "./CallDeclined";
import Conference from "../Conference";
import Calling from "./Calling";
import { values } from "../../App";

function Call() {
  const {
    setContainer,
    setCall, 
    setReceive,
    setStream,
    stream,
    setDisplay,
    display,
    container,
    myVideo,
    userVideo,
    callUser,
    callAccepted,
  } = useContext(values);

  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [timer, setTimer] = useState(true);


  useEffect(() => {
    
  },[])


  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimer(false);
      console.log(timerId)
    }, 40000);
    return () => clearTimeout(timerId);
  }, [callAccepted]);

  function handelClick() {
    setDisplay(!display);
  }

  useEffect(() => {
    if (mic) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          myVideo.current.srcObject = stream;
        });
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          setStream(stream);
          myVideo.current.srcObject = stream;
        });
    }
  }, [mic]);
  return (
    <>
      {container ? (
        <div className="call">
          {timer ? (
            <>
              <Calling
                camera={camera}
                mic={mic}
                setCamera={setCamera}
                setMic={setMic}
                handleClick={handelClick}
              />
              {callAccepted ? (
                <div className="call">
                  <Conference
                    camera={camera}
                    mic={mic}
                    setCamera={setCamera}
                    setMic={setMic}
                    handleClick={handelClick}
                  />
                </div>
              ) : (
                <CallDeclined
                  camera={camera}
                  mic={mic}
                  setCamera={setCamera}
                  setMic={setMic}
                  handleClick={handelClick}
                  setTimer={setTimer}
                  timer={timer}
                />
              )}
            </>
          ) : (
            <CallDeclined
              camera={camera}
              mic={mic}
              setCamera={setCamera}
              setMic={setMic}
              handelClick={handelClick}
              setTimer={setTimer}
              timer={timer}
            />
          )}
        </div>
      ) : null}
    </>
  );
}

export default Call;
