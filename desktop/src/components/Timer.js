import { useContext, useEffect, useState } from 'react'

import { AppContext } from '../context/AppContext';
import { TimerContext } from '../context/TimerContext';
import { AuthContext } from '../context/AuthContext';

const Timer = () => {

  const abortController = new AbortController();

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
      ),
      signal: abortController.signal
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
      ),
      signal: abortController.signal
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


  const shortenTitle = (title, value) => {
    if(title !== null) {
      if(title.length > value) {
        return title.substring(0, value) + '...';
      } else {
        return title;
      }
    }
  }


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

    return () => {
      abortController.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[timer.pause, timer.time.id])


  return (

      <div className="timer-wrapper container pt2 pb2">

        <button 
         className="btn btn--none"
         onClick={() => app.setTask(timer.time.id)}
        >{shortenTitle(timer.time.name, 30)}</button>

        {timer.time.id &&

          <div className="timer">

            {/* {!timer.pause &&

              <h2 className="pr2">{timer.time.count}</h2>

            } */}

            {timer.pause

              ? <button
                className="btn btn--icon"
                onClick={() => timer.startTimer(timer.time.id, timer.time.name, timer.time.count)}
              >
                <svg viewBox="0 0 100 100" className="ic-svg s10"> 
                  <use xlinkHref="/assets/sprite.svg#play"></use>
                </svg>
              </button>

              : <button
                  className="btn btn--icon"
                  onClick={() => timer.stopTimer()}
                >
                  <svg viewBox="0 0 100 100" className="ic-svg s10"> 
                    <use xlinkHref="/assets/sprite.svg#stop"></use>
                  </svg>
                </button>
            }

        </div>

}
    </div>

  )
}

export default Timer
