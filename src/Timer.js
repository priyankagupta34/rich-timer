import { useEffect, useState } from "react";

const Timer = () => {
  const [second, setSecond] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const startTimer = () => {
    console.log("Timer started");
    second > 0 && setIsRunning(true);
  };
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecond((prevSecond) => (prevSecond > 0 ? prevSecond - 1 : 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!second) {
      setIsRunning(false);
    }
  }, [second]);

  const formatSeconds = second || 0;
  const hours = Math.floor(formatSeconds / 3600).toString();
  const minutes = Math.floor((formatSeconds - hours * 3600) / 60).toString();
  const seconds = (
    (formatSeconds - (hours * 3600 + minutes * 60)) %
    60
  ).toString();
  const display = `${hours.padStart(2, "0")}:${minutes.padStart(
    2,
    "0"
  )}:${seconds.padStart(2, "0")}`;
  return (
    <div className="container">
      <div>
        <form>
          <h1>Countdown Timer</h1>
          <div className="displayTimer">{display}</div>
          <div className="action">
            <input
              type="number"
              placeholder="Set time (seconds)"
              value={second}
              onChange={(e) => setSecond(Number.parseInt(e.target.value))}
              disabled={isRunning}
            />
            <button type="submit" onClick={startTimer} disabled={isRunning}>
              Start
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
              }}
            >
              Pause
            </button>
            <button
              type="reset"
              onClick={() => {
                setSecond(0);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Timer;
