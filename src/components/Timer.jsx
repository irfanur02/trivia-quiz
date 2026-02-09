import { useEffect, useState } from "react";

export default function Timer({ start = false, duration = 10, onFinish }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!start) return;

    if (timeLeft === 0) {
      if (onFinish) {
			  onFinish();
			}
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [start, timeLeft, onFinish]);

  return (
    <nav className="w-full flex justify-center">
      <div className="p-3">
        <span className="font-medium text-[2.5rem] text-white">
          {timeLeft}
        </span>
      </div>
    </nav>
  );
}
