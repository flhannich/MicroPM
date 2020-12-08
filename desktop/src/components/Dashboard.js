import React, {useEffect, useState, useContext} from "react";

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import { SettingsContext } from '../context/SettingsContext';

import { Header, Logout, CardTask, CardProject, FooterModal, Footer } from '../components';

const { Menu, MenuItem } = window.remote;

const Dashboard = () => {

  const token = useContext(AuthContext).token;
  const app = useContext(AppContext);
  const settings = useContext(SettingsContext);

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);

  const _getTasksByStatus = (status) => {
    if(!token) return;
    setLoading(true)
    fetch(`${settings.api}/api/status/tasks`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({status: status})
    })
    .then((response) => response.json())
    .then((json) => setTasks(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }


  const _getProjects = () => {
    if(!token) return;
    fetch(`${settings.api}/api/projects`, {
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
    fetch(`${settings.api}/api/projects`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({name: 'New Project'})
    })
    .then((json) => _getProjects())
    .catch((error) => console.error(error))
    .finally(() => setModalState(false))
  }


  const _deleteProject = (projectId) => {
    if(!token) return;
    fetch(`${settings.api}/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
    .then(() => _getProjects())
    .catch((error) => console.error(error))
  }


  const contextMenu = () => {
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


  useEffect(() => {

    if(settings.api !== null) {
      _getProjects();
      _getTasksByStatus('In Progress');
      contextMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.api]);




    return (
      <>

      {loading
        ? <p></p>
        : (
          <>

        <Header />

        <Logout />

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
            <button
              className="btn btn--secondary"
              onClick={() => _createProject()}
            >New Project</button>
        </FooterModal>

        <Footer>
          <button
            className="btn btn--none"
            onClick={() => setModalState(!modalState)}>
          AD</button>
        </Footer>

        </>

      )}
        </>
      )
    }

export default Dashboard
