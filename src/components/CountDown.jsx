import { useEffect, useRef, useState } from "react";
import moment from "moment"
const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  if (minutes <= 10) minutes = "0" + minutes;
  if (seconds <= 10) minutes = "0" + seconds;
  return minutes + ":" + seconds;
};
export default function CountDown( {seconds} ) {
  // Prendre la date Du Token
  // Prendre la date Actuelle
  const diff = moment(seconds).diff(moment(), "seconds");
  console.log(diff)
  const [countdown, setCountdown] = useState(diff);
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);
  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current);
    }
  });
  return <span>{formatTime(countdown)}</span>;
}
