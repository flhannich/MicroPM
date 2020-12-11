import { useContext } from 'react';

import { AppContext } from '../context/AppContext';

const CardTask = ( { data }) => {

  const app = useContext(AppContext);

  return (

    <>
      <span data-task data-id={data.id}>
        <h2>{data.name}</h2>
        <div>
          {app.activeTask === data.id &&
            <span className="info" >
              {app.time}
            </span>
          }
          {data.is_review === '1' &&
            <svg viewBox="0 0 100 100" className="ic-svg svg--brand s16"> 
              <use xlinkHref="/assets/sprite.svg#review"></use>
            </svg>
          }
          {data.unread_message_count === 0 &&
            <span className="count">{data.tasks_count}</span>
          }
        </div>
      </span>
    </>

  )
}

export default CardTask
