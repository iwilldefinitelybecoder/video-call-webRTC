import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [isClockEnabled, setIsClockEnabled] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isClockEnabled) {
      intervalId = setInterval(() => {
        // Update seconds and minutes
        setSeconds((prevSeconds) => (prevSeconds === 59 ? 0 : prevSeconds + 1));
        setMinutes((prevMinutes) => (seconds === 59 ? prevMinutes + 1 : prevMinutes));
      }, 1000);
    }

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, [isClockEnabled, seconds]);

  const toggleClock = () => {
    setIsClockEnabled((prevIsClockEnabled) => !prevIsClockEnabled); 
  };
 
  return (
    <div> 
      {isClockEnabled && (
        <div>
          <span>{minutes < 10 ? '0' + minutes : minutes}</span> :{' '}
          <span>{seconds < 10 ? '0' + seconds : seconds}</span>
        </div>
      )}
    
    </div>
  );
};

export default Clock;
