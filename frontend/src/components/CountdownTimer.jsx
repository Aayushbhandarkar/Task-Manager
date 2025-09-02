import React, { useState, useEffect } from "react";

const CountdownTimer = ({ dueDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(dueDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [dueDate]); // ✅ re-run only if dueDate changes

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) return;

    timerComponents.push(
      <span key={interval} className="bg-gray-200 px-2 py-1 rounded mx-1">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="text-sm font-medium">
      {timerComponents.length ? (
        <div>
          <span className="text-gray-600">Time remaining: </span>
          {timerComponents}
        </div>
      ) : (
        <span className="text-red-600">Time's up!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
