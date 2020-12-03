import React, {useEffect, useState, useContext} from "react";

import { Link } from "react-router-dom";

import { AuthContext } from '../context/AuthContext'; // import based on where you put it

import { CardTask, CardProject, Modal, Footer } from '../components';

const { Menu, MenuItem } = window.remote;

const Project = () => {

const id = 1;

const token = useContext(AuthContext).token;

const [project, setProject] = useState([]);
const [tasks, setTasks] = useState([]);
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);
const [modalState, setModalState] = useState(false);

const _getTasks = () => {
  if(!token) return;
  setLoading(true)
  fetch(`http://192.168.178.35:8000/api/tasks/project/${id}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  .then((json) => setTasks(json))
  .catch((error) => console.error(error))
  .finally(() => setLoading(false))
}


const _getProject = () => {
  if(!token) return;
  fetch(`http://192.168.178.35:8000/api/projects/${id}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  .then((json) => setProject(json))
  .catch((error) => console.error(error))
}

const _createTask = () => {
  if(!token) return;
  fetch(`http://192.168.178.35:8000/api/tasks/create/${id}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  .then((json) => _getTasks())
  .catch((error) => console.error(error))
  .finally(() => setModalState(false))
}


const _deleteTask = (taskId) => {
  if(!token) return;
  fetch(`http://192.168.178.35:8000/api/tasks/${taskId}/delete`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  .then(() => _getTasks())
  .catch((error) => console.error(error))
}


useEffect(() => {
  _getProject();
  _getTasks();
  contextMenu();
}, []);


const contextMenu = () => {
  window.addEventListener('contextmenu', (e) => {
     const menu = new Menu();
     if (e.target.dataset.task) {
       menu.append(new MenuItem({
         label: "Delete Task",
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
          <li>
            <CardProject
              data={project}
            />
          </li>
        </ul>

        {[...new Set(tasks.map((item) => item.status))].map((cat, index) =>
          <ul>
            <span className="label pb2">{cat}</span>

            {tasks.map((item, index) =>
              <>
              {item.status === cat &&
                <li>
                  <CardTask
                    key={index}
                    data={item}
                  />
                </li>
              }
              </>
            )}
          </ul>
        )}



      </article>

      <Modal
        setModalState={setModalState}
        modalState={modalState}
      >
          <a
            className="btn btn--secondary"
            onClick={() => _createTask()}
          >New Task</a>
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

export default Project
