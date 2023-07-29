import React, { useContext } from "react";
import { values } from "../App";
import Clock from "./Clock";
import { AiFillCloseSquare } from "react-icons/ai";
import { MdCall, MdCallEnd } from "react-icons/md";
import {
  BsMicMuteFill,
  BsMicFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
} from "react-icons/bs";

import "./receiving/recieve.css";
function Conference({ camera, mic, setCamera, setMic, handelClick }) {
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
    leaveCall,
  } = useContext(values);

  return (
    display && (
      <div className="call">
        <div className={display ? "side" : "main"}>
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

        <div className="second">
          {stream && (
            <video playsInline ref={userVideo} autoPlay className="userVideo" />
          )}
        </div>

        <div className="action-container">
          <div className="buttons-hover">
            {mic ? (
              <BsMicMuteFill
                style={{ fontSize: "25px", color: "white" }}
                onClick={(e) => setMic(!mic)}
              />
            ) : (
              <BsMicFill
                style={{ fontSize: "25px", color: "white" }}
                onClick={(e) => setMic(!mic)}
              />
            )}
          </div>
          <div className="">
            {/* Include the Clock component */}
            <Clock />
          </div>
          <div className="buttons-hover">
            {camera ? (
              <BsCameraVideoFill
                style={{ fontSize: "25px", color: "white" }}
                onClick={(e) => setCamera(!camera)}
              />
            ) : (
              <BsCameraVideoOffFill
                style={{ fontSize: "25px", color: "white" }}
                onClick={(e) => setCamera(!camera)}
              />
            )}
          </div>
          <div className="buttons-hover" onClick={(e) => {handelClick();leaveCall()}}>
            <MdCallEnd style={{ fontSize: "40px", color: "red" }} />
          </div>
        </div>
      </div>
    )
  );
}

export default Conference;
