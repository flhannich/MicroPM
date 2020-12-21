import { useRef, useState, useContext, useEffect } from 'react';
import { SettingsClient, Footer, FooterModal, Textarea } from './'

import { format } from "date-fns";
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

const { Menu, MenuItem } = window.remote;

const TimerList = ({ taskId }) => {
  
  const abortController = new AbortController();

  const token = useContext(AuthContext).token;
  const app = useContext(AppContext);

  const [timers, setTimers] = useState([]);
  const [activeTimer, setActiveTimer] = useState(null);

  const timersRef = useRef(timers);
  timersRef.current = timers;


  const _createTimer = () => {
    if(!token) return;
    fetch(`${app.api}/api/timer/task/${taskId}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({
        name: '0:00:00',
      }),
      signal: abortController.signal
    })
    .then((response) => response.json())
    .then((json) => {
      setTimers(timers.concat(json));
      // callback(json);
    })
    .catch((error) => console.error(error))
  }



  const _updateTimer = (value, id) => {
    if(!token) return;
    fetch(`${app.api}/api/timer/${id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({
        time: value,
      }),
      signal: abortController.signal
    })
    .catch((error) => console.error(error))
  }


  const _deleteTimer = (id) => {
    if(!token) return;
    fetch(`${app.api}/api/timer/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      signal: abortController.signal
    })
    .catch((error) => console.error(error))
  }

  
  const _getTimers = () => {
    if(!token) return;
    fetch(`${app.api}/api/timer/task/${taskId}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      signal: abortController.signal
    })
    .then((response) => response.json())
    .then((json) => {
      setTimers(json)
    })
    .catch((error) => console.error(error))
  }

  const editTimer = (id) => {
    setActiveTimer(id)
  }

  const deleteTimer = (id) => {
    _deleteTimer(id);
    const filteredTimers = timersRef.current.filter(item => item.id !== parseInt(id))
    setTimers(filteredTimers)
  };


  const handleCallback = (data) => {
    console.log(data);
    // callback(data)
  };


  const handleBlur = (value) => {
    if(value !== '') {
      _updateTimer(value, activeTimer)
      setActiveTimer(null);
    }
  };


  const handleFocus = (elem) => {
    setTimeout(function() {
      elem.firstChild.focus();
    }, 0);
  };


  useEffect(() => {
    contextMenu();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  useEffect(() => {
    if(app.api !== null) {
      _getTimers(taskId);
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId, app.api]);


  const elapsedTime = (time) => {
    return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de });
  }
  
  const contextMenu = () => {
    window.addEventListener('contextmenu', (e) => {
       const menu = new Menu();
       if (e.target.dataset.timer) {
         menu.append(new MenuItem({
           label: "Edit Timer",
           click: () => {
             handleFocus(e.target.parentNode)
             setActiveTimer(e.target.dataset.id);
           }
         }));
         menu.append(new MenuItem({
          type: "separator",
        }));
         menu.append(new MenuItem({
          label: "Delete Timer",
          click: () => {
           deleteTimer(e.target.dataset.id)
          }
        }));
       }
       menu.popup({ window: window.remote.getCurrentWindow() })
     }, false)
  }

  return (

    <>
          { timers.map((item, index) => 

            <div 
              key={index}
              className="timer-list-wrapper" 
            >

          {(parseInt(activeTimer) === item.id)

          ?  <Textarea
               data={item.time}
               callback={handleBlur}
            />

          : <p
              data-timer
              data-id={item.id}
              onClick={() => handleCallback(item)}
            >
              {item.time}
              <span className="info">
                {elapsedTime(item.updated_at)}
              </span>
            </p>

          }

            </div>
        )}

            <div className="timer-list-footer">

              <button 
                className="btn btn--icon"
                onClick={_createTimer}
                >
                <svg viewBox="0 0 100 100" className="ic-svg s16"> 
                  <use xlinkHref="/assets/sprite.svg#add"></use>
                </svg>
              </button>

            </div>
    </>

  )
}

export default TimerList
