import { useEffect, useRef, useState } from "react";

export default function useCountdown(initialSeconds = 10, onDone) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timerId.current);
          onDone?.();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerId.current);
  }, [onDone]);

  const reset = (s = initialSeconds) => {
    clearInterval(timerId.current);
    setSeconds(s);
  };

  return { seconds, reset, isDone: seconds === 0 };
}
