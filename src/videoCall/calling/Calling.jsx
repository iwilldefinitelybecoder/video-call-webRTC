import React, { useContext } from "react";
import { values } from "../../App";

import { AiFillCloseSquare } from "react-icons/ai";
import { MdCall, MdCallEnd } from "react-icons/md";
import {
  BsMicMuteFill,
  BsMicFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
} from "react-icons/bs";
import "../receiving/recieve.css";
import "./call.css";

function Calling({ camera, mic, setCamera, setMic, handleClick }) {
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

  return (
    <div className={callAccepted && display ? "side" : "main"}>
      {!display ? (
        <>
          <div className="close" onClick={() => setContainer(false)}>
            <AiFillCloseSquare
              style={{ fontSize: "30px", color: "rgba(184, 17, 17, 1)" }}
            />
          </div>

          <div className="declinee" onClick={(e) => setContainer(false)}>
            <MdCallEnd style={{ fontSize: "40px", color: "white" }} />
          </div>
          <span className="callerId">Calling</span>
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

export default Calling;
