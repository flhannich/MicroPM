import { useContext, useEffect, useState, useRef } from 'react'

import { AppContext } from '../context/AppContext';

const Timer = ( { id } ) => {

  const app = useContext(AppContext);


  const [pause, setPause] = useState(false);
  const [time, setTime] = useState(false);
  const node = useRef()

  const startTimer = () => {
    app.setGlobalTimer({ name: 'TASK', time: "e" })
  }

  const stopTimer = () => {

  }

  const setTime = (value) => {
    console.log(value)
  }

  return (

    <>

      <div className="timer-wrapper container pt2 pb2">

        <span className="label">TASK</span>

        <div className="timer mr2">

          {pause
            ? <button
                className="small"
                onClick={() => console.log('start Timer')}
              >Play</button>
            : <button
                className="small"
                onClick={() => console.log('stop Timer')}
              >Stop</button>
          }

          <div
            contentEditable={(pause) ? "" : false}
            suppressContentEditableWarning={true}
            onBlur={(e) => setTime(e.target.innerText)}
          >
            {'0:00:00'}
          </div>

        </div>
      </div>

    </>


  )
}

export default Timer
