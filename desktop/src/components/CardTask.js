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
            <span className="icon">R</span>
          }
          {data.unread_message_count > 0 &&
            <span className="icon">U</span>
          }
        </div>
      </span>
    </>

  )
}

export default CardTask
