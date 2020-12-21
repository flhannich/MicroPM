import React, {useEffect, useState, useRef, useContext} from "react";

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import { Header, TaskList, CardTask, Textarea, FooterModal, ClientList, Footer, Dropdown } from '../components';

const { Menu, MenuItem } = window.remote;

const Project = () => {

const abortController = new AbortController();

const token = useContext(AuthContext).token;
const app = useContext(AppContext);

const [project, setProject] = useState([]);
const [projectClient, setProjectClient] = useState(null);
const [tasks, setTasks] = useState([]);
const [clients, setClients] = useState([]);
const [isSync, setIsSync] = useState(false);
const [loading, setLoading] = useState(true);
const [modalState, setModalState] = useState(false);
const [dropdownState, setDropdownState] = useState(false);

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
    },
    signal: abortController.signal
  })
  .then((response) => response.json())
  .then((json) => {
    setTasks(json)
  })
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
    },
    signal: abortController.signal
  })
  .then((response) => response.json())
  .then((json) => {
    setProject(json)
    if(json.client !== null) {
      setProjectClient(json.client.name)
    }
  })
  .catch((error) => console.error(error))
}

const _getClients = () => {
  if(!token) return;
  fetch(`${app.api}/api/clients`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    },
    signal: abortController.signal
  })
  .then((response) => response.json())
  .then((json) => {
    setClients(json)
  })
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
    body: JSON.stringify({project}),
    signal: abortController.signal
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
    },
    signal: abortController.signal
  })
  .then((response) => response.json())
  .then((json) => {
    app.setTask(json.id)
  })
  .catch((error) => console.error(error))
  .finally(() => setModalState(false))
}


const _updateTask = (task) => {
  if(!token) return;
  fetch(`${app.api}/api/tasks/${task.id}`, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    },
    body: JSON.stringify({task}),
    signal: abortController.signal
  })
  .catch((error) => console.error(error))

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

const updateProjectClient = (client) => {
  if(project.client_id !== client.id) {
    project.client_id = client.id;
    setProjectClient(client.name);
    _updateProject();
    setDropdownState(false);
  }
}

const editClient = (id) => {
  console.log(id);
} 

const updateName = (data) => {
  if(project.name !== data) {
    project.name = data;
    _updateProject()
  }
}

const updateTaskStatus = (id, status) => {
  let newTaskArray = [];
  tasks.forEach((item, index) => {
    if(item.id === parseInt(id)) {
      item.status = status;
      _updateTask(item);
    }
    newTaskArray.push(item);
  });
  setTasks(newTaskArray);
}


const updateSync = () => {
  setIsSync(!isSync)
  if(isSync) {
    project.is_sync = '0'
  } else {
    project.is_sync = '1';
  }
  _updateProject()
};

const removeTask = (id) => {
  _deleteTask(id)
  console.log('blub');
  const filteredTasks = tasksRef.current.filter(item => item.id !== parseInt(id))
  setTasks(filteredTasks)
}


useEffect(() => {
  _getProject();
  _getClients();
  _getTasks();
  contextMenu();

  return () => {
    abortController.abort();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


useEffect(() => {
  project.is_sync === '1' && setIsSync(true);
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

              <svg viewBox="0 0 100 100" className="ic-svg mr3 s16"> 
                <use xlinkHref="/assets/sprite.svg#folder"></use>
              </svg>

              <div className="card-text-wrapper">

                <div className="card-title-wrapper">

                  <Textarea
                    data={project.name}
                    callback={updateName}
                  />

                  <span className="checkbox-status-container">

                    <input
                      type="checkbox"
                      value={project.is_sync}
                      checked={isSync}
                      onChange={() => updateSync()}
                      />

                    <span className="checkmark-container">
                      <svg viewBox="0 0 100 100" className="ic-svg s16"> 
                        <use xlinkHref="/assets/sprite.svg#sync"></use>
                      </svg>
                    </span>

                  </span>

                </div>


                <div className="dropdown-wrapper">

                  <button 
                    className="btn btn--small"
                    onClick={() => setDropdownState(!dropdownState)}
                    >
                      {(project.client !== null && project.client !== undefined)
                        ? `${projectClient}`
                        : 'Choose client'
                      }
                  </button>

                  <Dropdown
                    setDropdownState={setDropdownState}
                    dropdownState={dropdownState}
                  >
                    <ClientList 
                      callback={updateProjectClient}
                    />
         
                  </Dropdown>

                </div>


              </div>
            </div>
          </li>
        </ul>

        
        <TaskList
          data={tasks}
          callback={updateTaskStatus}
        />
        


      </article>

      <Footer>
        <button
          className="btn btn--icon"
          onClick={() => setModalState(!modalState)}>
            <svg viewBox="0 0 100 100" className="ic-svg s16"> 
              <use xlinkHref="/assets/sprite.svg#more"></use>
            </svg>
        </button>
      </Footer>


      <FooterModal
        setModalState={setModalState}
        modalState={modalState}
      >
          <button
            className="btn btn--secondary"
            onClick={() => _createTask()}
          >New Task</button>
      </FooterModal>

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
