import React, { useEffect, useState, useRef, useContext } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import {
  BsMicFill,
  BsMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
} from "react-icons/bs";

import { MdCallEnd, MdCall } from "react-icons/md";

import "./recieve.css";
import Clock from "../Clock";
import { values } from "../../App";
import PickCall from "./PickCall";
import Conference from "../Conference";

function Recieve() {
  const {
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
  } = useContext(values);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);

  function handelClick() {
    setDisplay(!display);
  }

  function handelDecline() {
    setCallAccepted(false);
  }

  useEffect(() => {
    if (mic) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
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
          <PickCall
            camera={camera}
            mic={mic}
            setCamera={setCamera}
            setMic={setMic}
            handelClick={handelClick}
            handelDecline={handelDecline}
          />
          <Conference
            camera={camera}
            mic={mic}
            setCamera={setCamera}
            setMic={setMic}
            handelClick={handelClick}
          />
        </div>
      ) : null}
    </>
  );
}

export default Recieve;
