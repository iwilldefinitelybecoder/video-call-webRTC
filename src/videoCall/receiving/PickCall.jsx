import React, { useContext } from "react";
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
import { values } from "../../App";

function PickCall({
  camera,
  mic,
  setCamera,
  setMic,
  handelClick,
  handelDecline,
}) {
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
    reciever
  } = useContext(values);
  return (
    <div className={display ? "side" : "main"}>
      {!display ? (
        <>
          <div className="close" onClick={() => setContainer(false)}>
            <AiFillCloseSquare
              style={{ fontSize: "30px", color: "rgba(184, 17, 17, 1)" }}
            />
          </div>
          <span className="callerId">Call from</span>
          <div
            className="callPick"
            onClick={(e) => {
              handelClick();
              answerCall();
            }}
          >
            <MdCall style={{ fontSize: "40px", color: "white" }} />
          </div>
          <div
            className="decline"
            onClick={(e) => {
              setContainer(false);
              handelDecline();
            }}
          >
            <MdCallEnd style={{ fontSize: "40px", color: "white" }} />
          </div>
          <span className="callerId">Call from{reciever.name}</span>
        </>
      ) : (
        camera && (
          <video
            src="http://techslides.com/demos/sample-videos/small.webm"
            loop
            playsInline
            muted
            autoPlay
            className="myVideo"
          />
        )
      )}
    </div>
  );
}

export default PickCall;
