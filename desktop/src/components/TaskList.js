import { useEffect } from 'react';

import { CardTask } from './';


const TaskList = ({ data, callback }) => {

  const statusSet = [
    'In Progress', 'Not Started', 'Completed'
  ]
  
  const onDragOver = e => {
    e.preventDefault(); 
  }

  const onDragLeave = e => {
    e.preventDefault(); 
  }


  const onDrop = e => {
    e.preventDefault();
    let dropzone;

    if(e.target.tagName === 'ul') {
      dropzone = e.target;
    } else {
      dropzone = e.target.closest('ul');
    }

    dropzone.classList.remove('is-active');

    let status = dropzone.dataset.status;
    let id = e.dataTransfer.getData("text/plain");

    callback(id, status)

    e.dataTransfer.clearData();
  }


  useEffect(() => {
    let dropzones = document.querySelectorAll('.dropzone');

    dropzones.forEach((item, index) => {
      item.ondragenter = (event) => {
        let target = event.target;

        if(target.tagName === "UL") {
          event.target.classList.add('is-active');
        }
      }
      item.ondragleave = (event) => {
        let target = event.target;

        if(target.tagName === "UL") {
         event.target.classList.remove('is-active');
        }
      }
    });
  }, []);

  
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
