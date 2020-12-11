import React, {useEffect, useState, useRef, useContext} from "react";

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import { Header, CardTask, Textarea, FooterModal, Footer } from '../components';

const { Menu, MenuItem } = window.remote;

const Project = () => {

const token = useContext(AuthContext).token;
const app = useContext(AppContext);

const [project, setProject] = useState([]);
const [tasks, setTasks] = useState([]);
const [sync, setSync] = useState(false);
const [loading, setLoading] = useState(true);
const [modalState, setModalState] = useState(false);

const tasksRef = useRef(tasks);
tasksRef.current = tasks;


const _getTasks = () => {
  if(!token) return;
  setLoading(true)
  fetch(`${app.api}/api/project/${app.project}/tasks`, {
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
  fetch(`${app.api}/api/projects/${app.project}`, {
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

const _updateProject = () => {
  if(!token) return;
  fetch(`${app.api}/api/projects/${app.project}`, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    },
    body: JSON.stringify({project})
  })
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

const _createTask = () => {
  if(!token) return;
  fetch(`${app.api}/api/tasks/${app.project}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .then((json) => _getTasks())
  .catch((error) => console.error(error))
  .finally(() => setModalState(false))
}


const _deleteTask = (id) => {
  fetch(`${app.api}/api/tasks/${id}`, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    }
  })
  .catch((error) => console.error(error))
}


const contextMenu = () => {
  window.addEventListener('contextmenu', (e) => {
     const menu = new Menu();
     if (e.target.dataset.task) {
       menu.append(new MenuItem({
         label: "Delete Task",
         click: () => {
           removeTask(e.target.dataset.id)
         }
       }));
     }
     menu.popup({ window: window.remote.getCurrentWindow() })
   }, false)
}


const updateName = (data) => {
  if(project.name !== data) {
    project.name = data;
    _updateProject()
  }
}


const updateSync = () => {
  setSync(!sync)
  if(sync) {
    project.is_sync = '0'
  } else {
    project.is_sync = '1';
  }
  _updateProject()
};

const removeTask = (id) => {
  _deleteTask(id)

  const filteredTasks = tasksRef.current.filter(item => item.id !== parseInt(id))
  setTasks(filteredTasks)
}


useEffect(() => {
  _getProject();
  _getTasks();
  contextMenu();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


useEffect(() => {
  project.is_sync === '1' && setSync(true);
}, [project]);


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
          <li>
            <div className="project-title-wrapper">
            <span className="pr3">IC</span>
            <div className="card-text-wrapper">
              <div className="card-title-wrapper">
                <Textarea
                  data={project.name}
                  callback={updateName}
                />
                <input
                  type="checkbox"
                  value={project.is_sync}
                  checked={sync}
                  onChange={() => updateSync()}
                />
              </div>
              <div
                className="client-title-wrapper"
              >
                {(project.client !== null && project.client !== undefined)
                  ? <button className="small">{project.client.name}</button>
                  : <button className="small">Personal</button>
                }
              </div>
            </div>
            </div>
          </li>
        </ul>


        <ul>
          <span className="label pb2">In Progress</span>
          {tasks.progress.map((item, index) =>
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


        <ul>
          <span className="label pb2">Not Started</span>
          {tasks.notstarted.map((item, index) =>
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


        <ul>
          <span className="label pb2">Completed</span>
          {tasks.completed.map((item, index) =>
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



      </article>

      <FooterModal
        setModalState={setModalState}
        modalState={modalState}
      >
          <button
            className="btn btn--secondary"
            onClick={() => _createTask()}
          >New Task</button>
      </FooterModal>

      <Footer>
        <button
          className="btn btn--none"
          onClick={() => setModalState(!modalState)}>
AD
        </button>
      </Footer>

      </>
    )}
      </>
    )
  }

export default Project



// {[...new Set(tasks.map((item) => item.status))].map((cat, index) =>
//   <ul
//     key={index}
//   >
//     <span className="label pb2">{cat}</span>
//
//     {tasks.map((item, index) => item.status === cat &&
//         <li
//           key={index}
//           onClick={() => app.setTask(item.id)}
//         >
//           <CardTask
//             key={index}
//             data={item}
//           />
//         </li>
//     )}
//   </ul>
// )}
