import { useContext } from 'react';

import { AppContext } from '../context/AppContext';
import { TimerContext } from '../context/TimerContext';

const CardTask = ( { data }) => {

  const app = useContext(AppContext);
  const timer = useContext(TimerContext);

  return (

    <>
      <a 
      data-task 
      data-id={data.id}
      onClick={() => app.setTask(data.id)}
      >

      {timer.time.id === data.id && !timer.pause &&

        <svg viewBox="0 0 100 100" className="ic-svg svg--brand s8"> 
          <use xlinkHref="/assets/sprite.svg#timer-indicator"></use>
        </svg>

        }

        <div 
          
          className="card-text-wrapper"
        >
          <div className="card-title-wrapper">

            <div className="inner-wrapper">

             <h2>{data.name}</h2>

            </div>

            <div className="inner-wrapper">

              {data.is_review === '1' &&
                <svg viewBox="0 0 100 100" className="ic-svg svg--brand s16"> 
                  <use xlinkHref="/assets/sprite.svg#review"></use>
                </svg>
              }

              {data.unread_message_count === 0 &&
                <span className="count">{data.tasks_count}</span>
              }

            </div>
            
          </div>

        </div>

      </a>
    </>

  )
}

export default CardTask
