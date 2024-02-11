import { useState, useRef } from "react";
import "./App.css";
export default function Home() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [previousTimes, setPreviousTimes] = useState<String[]>([]);
  const intervalRef = useRef<number>();
  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current!);
    } else {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    if (time !== 0) {
      setPreviousTimes([...previousTimes, displayTime]);
    }
    clearInterval(intervalRef.current!);
    setTime(0);
    setIsRunning(false);
  };

  const seconds = time;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const displayTime = `${String(hours).padStart(2, "0")}:${String(
    minutes % 60
  ).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <main>
      <h1>Timer</h1>
      <h2>{displayTime}</h2>
      <button onClick={handleStartPause} className="p-200 m-2">
        {isRunning ? <>Pause</> : <>Start</>}
      </button>
      <button onClick={handleReset} className="p-2 m-20">
        Reset
      </button>
      {previousTimes.length > 0 && (
        <>
          <h2>Previous Times</h2>
          <div>
            {previousTimes.map((time: String, index) => (
              <div key={index}>{time}</div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
