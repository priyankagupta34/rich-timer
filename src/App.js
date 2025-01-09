import React, { useState, useEffect } from "react";

const App = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);

  // Update the timer at regular intervals
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    if (time > 0) setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div style={styles.app}>
      <h1>Countdown Timer</h1>
      <div style={styles.timer}>{formatTime(time)}</div>
      <div style={styles.controls}>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          placeholder="Set time (seconds)"
          disabled={isRunning}
          style={styles.input}
        />
        <button type="button" onClick={handleStart} style={styles.button}>
          Start
        </button>
        <button type="button" onClick={handlePause} style={styles.button}>
          Pause
        </button>
        <button type="button" onClick={handleReset} style={styles.button}>
          Reset
        </button>
      </div>
    </div>
  );
};

const styles = {
  app: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  timer: {
    fontSize: "48px",
    fontWeight: "bold",
    margin: "20px 0",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "120px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default App;
