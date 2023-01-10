import { Text } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

const Timer = ({ seconds, callback }) => {
  const [timer, setTimer] = useState(seconds);
  const intervalId = useRef();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      callback(false);
      clearInterval(intervalId.current);
    }
  }, [timer]);

  return (
    <Text color="rgb(82, 86, 94)" fontSize="0.75rem">
      Mohon tunggu dalam{" "}
      <Text as="span" color="teal" fontWeight="700">
        {timer} detik
      </Text>{" "}
      untuk kirim ulang
    </Text>
  );
};

export default Timer;
