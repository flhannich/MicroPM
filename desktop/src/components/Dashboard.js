import React, {useEffect, useState, useContext} from "react";

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

import { Header, CardTask, CardProject, FooterModal, Footer } from '../components';

const { Menu, MenuItem } = window.remote;

const Dashboard = () => {

const token = useContext(AuthContext).token;
const app = useContext(AppContext);

const [projects, setProjects] = useState([]);
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [modalState, setModalState] = useState(false);

const _getTasks = (id) => {
  if(!token) return;
  setLoading(true)
  fetch(`http://192.168.178.35:8000/api/tasks/get/status`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    },
    body: JSON.stringify({status: 'In Progress'})
  })
  .then((response) => response.json())
  .then((json) => setTasks(json))
  .catch((error) => console.error(error))
  .finally(() => setLoading(false))
}


const _getProjects = () => {
  if(!token) return;
  fetch(`http://192.168.178.35:8000/api/projects`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  .then((json) => setProjects(json))
  .catch((error) => console.error(error))
}

const _createProject = () => {
  if(!token) return;
  fetch(`http://192.168.178.35:8000/api/projects/create`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  .then((json) => _getProjects())
  .catch((error) => console.error(error))
  .finally(() => setModalState(false))
}


const _deleteProject = (id) => {
  if(!token) return;
  fetch(`http://192.168.178.35:8000/api/projects/${id}/delete`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((response) => response.json())
  // .then(() => setProjects(projects.filter(item => item.id !== id)))
  .then(() => _getProjects())
  .catch((error) => console.error(error))
}


useEffect(() => {
  _getProjects();
  _getTasks();
  _contextMenu();
}, []);


const _contextMenu = () => {
  window.addEventListener('contextmenu', (e) => {
     const menu = new Menu();
     if (e.target.dataset.project) {
       menu.append(new MenuItem({
         label: "Delete Project",
         click: () => {
           _deleteProject(e.target.dataset.id)
         }
       }));
     }
     menu.popup({ window: window.remote.getCurrentWindow() })
   }, false)
}

  return (
    <>

    {loading
      ? <p></p>
      : (
        <>

        <Header />

      <article className="main container">

        {tasks.length > 0 &&
          <ul>

          <span className="label pb2">In Progress</span>

            {tasks.map((item, index) =>
              <li
                key={index}
                onClick={() => app.setTask(item.id)}
              >
                <CardTask
                  key={index}
                  data={item}
                />
              </li>
            )}
          </ul>
        }

        {projects.length > 0 &&
          <ul>

          <span className="label pb2">Projects</span>

            {projects.map((item, index) =>
              <li
                key={index}
                onClick={() => app.setProject(item.id)}
              >
                <CardProject
                  key={index}
                  data={item}
                />
              </li>
            )}
          </ul>
        }

      </article>

      <FooterModal
        setModalState={setModalState}
        modalState={modalState}
      >
          <a
            className="btn btn--secondary"
            onClick={() => _createProject()}
          >New Project</a>
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

export default Dashboard
