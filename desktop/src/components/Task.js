import React, {useEffect, useState, useContext} from "react";

import { Link } from "react-router-dom";

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

import { CardTask, CardSubTask, Modal, Footer } from '../components';

const { Menu, MenuItem } = window.remote;

const Task = () => {

const token = useContext(AuthContext).token;
const app = useContext(AppContext);

console.log(app.task);

const [task, setTask] = useState([]);
const [subTasks, setSubTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [modalState, setModalState] = useState(false);

const _getSubTasks = () => {
  if(!token) return;
  setLoading(true)
  fetch(`http://192.168.178.35:8000/api/subtasks/task/${app.task}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  .then((json) => setSubTasks(json))
  .catch((error) => console.error(error))
  .finally(() => setLoading(false))
}


const _getTask = () => {
  if(!token) return;
  fetch(`http://192.168.178.35:8000/api/tasks/${app.task}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  .then((json) => setTask(json))
  .catch((error) => console.error(error))
  .finally(() => setLoading(false))
}

const _createSubTask = () => {
  if(!token) return;
  fetch(`http://192.168.178.35:8000/api/subtasks/create/${app.task}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  .then((json) => _getSubTasks())
  .catch((error) => console.error(error))
  .finally(() => setModalState(false))
}


const _deleteTask = (taskId) => {
  if(!token) return;
  fetch(`http://192.168.178.35:8000/api/subtasks/${taskId}/delete`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  .then((json) => _getSubTasks())
  .catch((error) => console.error(error))
}


useEffect(() => {
  _getTask();
  // _getSubTasks();
  contextMenu();
}, []);


const contextMenu = () => {
  window.addEventListener('contextmenu', (e) => {
     const menu = new Menu();
     if (e.target.dataset.task) {
       menu.append(new MenuItem({
         label: "Delete Subtask",
         click: () => {
           _deleteTask(e.target.dataset.id)
         }
       }));
     }
     menu.popup({ window: window.remote.getCurrentWindow() })
   }, false)
}




  return (
    <>

    {loading
      ? <p>Loading</p>
      : (
        <>

      <article className="main container">

        <ul>
          <li
            onClick={() => app.setTask(null)}
          >
            <CardTask
              data={task}
            />
          </li>
        </ul>



        <ul>
        <span className="label pb2">Description</span>
          <li className="paragraph-small">
            <p>{task.description}</p>
          </li>
        </ul>


      </article>

      <Modal
        setModalState={setModalState}
        modalState={modalState}
      >
          <a
            className="btn btn--secondary"
            onClick={() => _createSubTask()}
          >New Sub Task</a>
      </Modal>

      <Footer>
        <a
          className="btn btn--none"
          onClick={() => setModalState(!modalState)}>
        AD</a>
      </Footer>

      </>
    )}
      </>
    )
  }

export default Task
