import React, {useEffect, useState, useRef, useContext} from "react";

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

import { Header, CardTask, CardProject, FooterModal, Footer } from '../components';

const { Menu, MenuItem } = window.remote;

const Dashboard = () => {

  const abortController = new AbortController();

  const token = useContext(AuthContext).token;
  const app = useContext(AppContext);

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);

  const projectsRef = useRef(projects);
  projectsRef.current = projects;

  const _getTasksByStatus = (status) => {
    if(!token) return;
    setLoading(true)
    fetch(`${app.api}/api/status/tasks`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({status: status}),
      signal: abortController.signal
    })
    .then((response) => response.json())
    .then((json) => setTasks(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }


  const _getProjects = () => {
    if(!token) return;
    fetch(`${app.api}/api/projects`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      signal: abortController.signal
    })
    .then((response) => response.json())
    .then((json) => setProjects(json))
    .catch((error) => console.error(error))
  }


  const _createProject = () => {
    if(!token) return;
    fetch(`${app.api}/api/projects`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({name: 'New Project'})
    })
    .then((response) => response.json())
    .then((json) => {
      app.setProject(json.id)
    })
    .catch((error) => console.error(error))
    .finally(() => setModalState(false))
  }


  const _deleteProject = (projectId) => {
    if(!token) return;
    fetch(`${app.api}/api/projects/${projectId}`, {
      method: "DELETE",
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
       if (e.target.dataset.project) {
         menu.append(new MenuItem({
           label: "Delete Project",
           click: () => {
             removeProject(e.target.dataset.id)
           }
         }));
       }
       menu.popup({ window: window.remote.getCurrentWindow() })
     }, false)
   }


   const removeProject = (id) => {
     _deleteProject(id)

     const filteredProjects = projectsRef.current.filter(item => item.id !== parseInt(id))
     setProjects(filteredProjects)
   }


  useEffect(() => {

    if(app.api !== null) {
      _getProjects();
      _getTasksByStatus('In Progress');
      contextMenu();
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.api]);


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
            className="btn btn--icon"
            onClick={() => setModalState(!modalState)}>
              <svg viewBox="0 0 100 100" className="ic-svg s16"> 
                <use xlinkHref="/assets/sprite.svg#more"></use>
              </svg>
          </button>
        </Footer>

        </>

      )}
        </>
      )
    }

export default Dashboard
