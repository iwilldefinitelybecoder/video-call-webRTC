import React, { useContext } from "react";
import { AiFillCloseSquare, AiOutlineClose } from "react-icons/ai";
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
import { values } from "../../App";
import "../receiving/recieve.css";
import "./call.css";

function CallDeclined({ camera, mic, setCamera, setMic, handelClick ,setTimer,timer}) {
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
    setCallAccepted,
    answerCall,
    leaveCall,
  } = useContext(values);

  const reDial = () => {
    setTimer(true);
  }

  return (
    <div className={display ? "side" : "main"}>
      {!display ? (
        <>
          <div className="close" onClick={() => setContainer(false)}>
            <AiFillCloseSquare
              style={{ fontSize: "30px", color: "rgba(184, 17, 17, 1)" }}
            />
          </div>

          <div
            className="callPick"
            onClick={(e) => {
              reDial();
              answerCall();
            }}
          >
            <MdCall style={{ fontSize: "40px", color: "white" }} />
          </div>
          <div
            className="declined"
            onClick={(e) => {
              setContainer(false);
            }}
          >
            <AiOutlineClose style={{ fontSize: "40px", color: "black" }} />
          </div>
          <span className="declinedId">Call Declined</span>
          <span className="Callagain">Call Again</span>
          <span className="Closecall">Close</span>
        </>
      ) : (
        camera && (
          <video
            muted
            ref={camera ? myVideo : null}
            playsInline
            autoPlay
            className="myVideo"
          />
        )
      )}
    </div>
  );
}

export default CallDeclined;
