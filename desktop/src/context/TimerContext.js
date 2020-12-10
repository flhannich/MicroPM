import { createContext, useState, useRef } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {

    const timer = useRef();

    const [pause, setPause] = useState(true);
    const [time, setTime] = useState({
      id: null,
      name: null,
      count: null,
    });


    const startTimer = (id, name, startTime) => {
      setPause(false)

      // let { s, m, h } = parseTime(startTime);
      //
      let s = 0;
      let m = 0;
      let h = 0;
      let sec, min;

      timer.current = setInterval(function(){

        s = s + 1;

        if (s === 60) {
          s = 0;
          m = m + 1;
        }

        if (m === 60) {
          m = 0;
          h = h + 1;
        }

        (s < 10) ? sec = '0' + s : sec = s;
        (m < 10) ? min = '0' + m : min = m;

      setTime({
        id: id,
        name: name,
        count: h + ':' + min + ':' + sec,
      })

      }, 1000);

    };


    const stopTimer = () => {
      setPause(true);
      clearInterval(timer.current);
    };

  return (
    <TimerContext.Provider
      value={{
        time,
        setTime,
        pause,
        stopTimer,
        startTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
