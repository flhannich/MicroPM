import { useContext, useEffect, useState } from 'react'

import { AppContext } from '../context/AppContext';
import { TimerContext } from '../context/TimerContext';
import { AuthContext } from '../context/AuthContext';

const Timer = () => {

  const app = useContext(AppContext);
  const token = useContext(AuthContext).token;
  const timer = useContext(TimerContext);

  const [activeTimer, setActiveTimer] = useState(null)


  const _createTime = () => {
    if(!token) return;
    fetch(`${app.api}/api/time/`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify(
        {
          task: timer.time.id
        }
      )
    })
    .then((response) => response.json())
    .then((json) => setActiveTimer(json))
    .catch((error) => console.error(error))
  }


  const _updateTime = () => {
    if(!token) return;
    fetch(`${app.api}/api/time/${activeTimer.id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify(
        {
          time: timer.time.count,
        }
      )
    })
    .catch((error) => console.error(error))
  }



  const parseTime = (startTime) => {

    let arr = startTime.split(':');

    let hours = arr[0];
    let minutes = arr[1];
    let seconds = arr[2];

    let s = parseInt(seconds);
    let m = parseInt(minutes);
    let h = parseInt(hours);

    return { s, m, h };
  };


  useEffect(() => {

    if(timer.pause === true) {
      if(activeTimer !== null) {
        _updateTime();
      }
    } else {
      if(timer.time.id !== null) {
        _createTime();
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[timer.pause, timer.time.id])


  return (

      <div className="timer-wrapper container pt2 pb2">

        <span 
         className="label"
        >{timer.time.name}</span>

        {timer.time.id &&

          <div className="timer mr2">

            {timer.pause

              ? <button
                className="small"
                onClick={() => timer.startTimer(timer.time.id, timer.time.name, timer.time.count)}
              >
                <svg viewBox="0 0 100 100" className="ic-svg s10"> 
                  <use xlinkHref="/assets/sprite.svg#play"></use>
                </svg>
              </button>

              : <button
                  className="small"
                  onClick={() => timer.stopTimer()}
                >
                  <svg viewBox="0 0 100 100" className="ic-svg s10"> 
                    <use xlinkHref="/assets/sprite.svg#stop"></use>
                  </svg>
                </button>
            }

          {!timer.pause &&
            <h2>{timer.time.count}</h2>
          }

        </div>

}
    </div>

  )
}

export default Timer
