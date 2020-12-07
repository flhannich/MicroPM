import React, {useEffect, useState, useContext} from "react";

import { Link } from "react-router-dom";

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

import { Header, CardTask, CardProject, Textarea, FooterModal, Footer } from '../components';

const { Menu, MenuItem } = window.remote;

const Project = () => {

const token = useContext(AuthContext).token;
const app = useContext(AppContext);

const [project, setProject] = useState([]);
const [tasks, setTasks] = useState([]);
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);
const [modalState, setModalState] = useState(false);

const _getTasks = () => {
  if(!token) return;
  setLoading(true)
  fetch(`http://192.168.178.35:8000/api/project/${app.project}/tasks`, {
    method: "GET",
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
  fetch(`http://192.168.178.35:8000/api/projects/${app.project}`, {
    method: "GET",
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
  fetch(`http://192.168.178.35:8000/api/tasks/${app.project}`, {
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
  fetch(`http://192.168.178.35:8000/api/tasks/${taskId}`, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  .then((json) => _getTasks())
  .catch((error) => console.error(error))
}


useEffect(() => {
  _getProject();
  _getTasks();
  contextMenu();
}, []);
//
// console.log(tasks);


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

const showProjectSettings = () => {

}

  return (
    <>

    {loading
      ? <p></p>
      : (
        <>

        <Header
          back={app.setProject}
        />

      <article className="main container">

        <ul>
          <li className="project-title-wrapper">
            <span className="pr3">IC</span>
            <div>
            <Textarea
              data={project.name}
            />
            <div
              className="client-title-wrapper"
              onClick={() => showProjectSettings()}
            >
              {(project.client !== null && project.client !== undefined)
                ? <span className="info">{project.client.name}</span>
                : <span className="info">Personal</span>
              }
              <span className="ic">E</span>
            </div>
            </div>
          </li>
        </ul>

        {[...new Set(tasks.map((item) => item.status))].map((cat, index) =>
          <ul>
            <span className="label pb2">{cat}</span>

            {tasks.map((item, index) =>
              <>
              {item.status === cat &&
                <li
                  onClick={() => app.setTask(item.id)}
                >
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

      <FooterModal
        setModalState={setModalState}
        modalState={modalState}
      >
          <a
            className="btn btn--secondary"
            onClick={() => _createTask()}
          >New Task</a>
      </FooterModal>

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
