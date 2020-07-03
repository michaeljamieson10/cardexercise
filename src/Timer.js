import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [cards, setCards] = useState();
  const [cardN, setCardN] = useState(1);
  const timerId = useRef();
  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds(seconds => seconds + 1)
    }, 1000)
    // useEffect(() => {
    //   async function loadProfile() {
    //     const res = await axios.get(`https://api.github.com/users/${name}`);
    //     setData(res.data.name);
    //   }
    //   loadProfile();
    // }, [name])
    return () => {
      clearInterval(timerId.current)
    }
  }, [])

  const stopTimer = () => {
    clearInterval(timerId.current)
  }

  return (
    <div>
      <h1>{seconds}</h1>
      <button onClick={stopTimer}>Stop</button>
    </div>

  )
}

export default Timer;