import { useContext, useState } from 'react';

import { CardTask } from './';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';


const TaskList = ({ data, callback }) => {

  // const statusSet = [...new Set(data.map(item => item.status))]

  const statusSet = [
    'In Progress', 'Not Started', 'Completed'
  ]
  
  let dropzone;

  const onDragOver = e => {
    e.preventDefault(); 
    // if(dropzone !== null) {
    //   if(e.target.tagName === 'ul') {
    //     dropzone = e.target;
    //   } else {
    //     dropzone = e.target.closest('ul');
    //   }
    //   dropzone.classList.add('is-active');
    // }
    // setDropState(true);
  }


  const onDragLeave = e => {
    e.preventDefault(); 
  }


  const onDrop = e => {
    e.preventDefault();

    if(e.target.tagName === 'ul') {
      dropzone = e.target;
    } else {
      dropzone = e.target.closest('ul');
    }

    let status = dropzone.dataset.status;
    let id = e.dataTransfer.getData("text/plain");

    callback(id, status)

    e.dataTransfer.clearData();
  }


  // ${dropState && 'is-active'}

  return (
    <>

      {statusSet.map((status, index) =>
        <ul
          key={index}
          className={`dropzone`}
          onDragLeave={(e) => onDragLeave(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e)}
          data-status = {status}
        >
          <span className="label pb2">{status}</span>
          
          {data.map((item, index) => (item.status === status) &&

            <li
              key={index}
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
