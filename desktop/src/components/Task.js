import React, {useEffect, useState, useContext} from "react";

import { Link } from "react-router-dom";

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import { SettingsContext } from '../context/SettingsContext';

import { Header, CardSubTask, CardMessage, CardDescription, Textarea, FooterModal, Footer } from '../components';

const { Menu, MenuItem } = window.remote;

const Task = () => {

  const auth = useContext(AuthContext);
  const app = useContext(AppContext);
  const settings = useContext(SettingsContext);

  const token = auth.token;
  const username = auth.username;

  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);


  const _getTask = () => {
    if(!token) return;
    fetch(`${settings.api}tasks/${app.task}`, {
      method: "GET",
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
    fetch(`${settings.api}subtasks/${app.task}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
    .then((response) => response.json())
    .then((json) => _getTask())
    .catch((error) => console.error(error))
    .finally(() => setModalState(false))
  }


  const _deleteSubTask = (subTaskId) => {
    if(!token) return;
    fetch(`${settings.api}subtasks/${subTaskId}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }


  useEffect(() => {
    _getTask();
    contextMenu();
  }, []);


  // console.log(task.subtask.filter(item => item.id !== 27));

  // console.log(setTask(task.subtask.some(item => item.id !== 27)))
  const contextMenu = () => {
    window.addEventListener('contextmenu', (e) => {
       const menu = new Menu();
       if (e.target.dataset.subtask) {
         menu.append(new MenuItem({
           label: "Delete Subtask",
           click: () => {
             _deleteSubTask(e.target.dataset.id)
           }
         }));
       }
       if (e.target.dataset.message) {
         menu.append(new MenuItem({
           label: "Create Subtask from Selection",
           click: () => {
             _deleteSubTask('000')
           }
         }));
         menu.append(new MenuItem({
           type: "separator",
         }));
         menu.append(new MenuItem({
           label: "Delete Message",
           click: () => {
             _deleteSubTask('000')
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

      <Header
        back={app.setTask}
      />

      <article className="main container">

      <ul>
        <li
        >
          <Textarea
            data={task.name}
          />
        </li>
      </ul>


      { task.subtask.length > 0 &&
        <ul>
        <span className="label pb2">Sub Tasks</span>
          {task.subtask.map((item, index) =>
            <li>
              <CardSubTask
                key={index}
                data={item}
              />
            </li>
          )}
        </ul>
      }


        <ul>
          <span className="label pb2">Description</span>
          <li
          >
            <Textarea
              data={task.description}
            />
          </li>
        </ul>


        {task.message.length > 0 &&
        <ul>
          <span className="label pb2">Messages</span>

          {task.message.map((item, index) =>
            <li>
              <CardMessage
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
            onClick={() => _createSubTask()}
          >New Sub Task</a>
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

export default Task
