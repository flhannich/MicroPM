import { useContext, useState } from 'react';

import { CardTask } from './';
import { AppContext } from '../context/AppContext';


const TaskList = ({ data, title }) => {

  const app = useContext(AppContext);
  const [dropState, setDropState] = useState(false);

  const statusSet = [...new Set(data.map(item => item.status))]

  const _updateTask = (task) => {
    console.log(task)
  }

  
  const onDragOver = event => {
    event.preventDefault();

    setDropState(true);
  }


  const onDragLeave = event => {
    event.preventDefault();

    setDropState(false);
  }


  const onDrop = event => {
    event.preventDefault();

    _updateTask(event.dataTransfer)
  }


  const onDragEnd = event => {
  }


  const onDragStart = event => {
    event.preventDefault();

    console.log(event);
  }


  return (
    <>

      {statusSet.map((status, index) =>

        <ul
          key={index}
          className={`dropzone ${dropState && 'is-active'}`}
          onDragLeave={(e) => onDragLeave(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e)}
        >
          <span className="label pb2">{status}</span>
          
          {data.map((item, index) => (item.status === status) &&
          
            <li
              key={index}
              draggable="true"
              onDragStart={(e) => onDragStart(e)}
              onDragEnd={(e) => onDragEnd(e)}
            >
              <CardTask
                key={index}
                data={item}
              />
            </li>

          )}

        </ul>
      )}

   </>
  )
}

export default TaskList
