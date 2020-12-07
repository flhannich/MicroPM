import React, {useEffect, useState, useContext} from "react";

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import { SettingsContext } from '../context/SettingsContext';

import { Header, CardSubTask, CardMessage, Textarea, FooterModal, Footer } from '../components';

const { Menu, MenuItem } = window.remote;

const Task = () => {

  const auth = useContext(AuthContext);
  const app = useContext(AppContext);
  const settings = useContext(SettingsContext);

  const token = auth.token;
  // const username = auth.username;

  const [task, setTask] = useState([]);
  const [review, setReview] = useState(false);
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

  const _updateTask = () => {
    if(!token) return;
    fetch(`${settings.api}tasks/${app.task}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({
          task
        })
    })
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }

  const _updateSubTask = (subtask) => {
    if(!token) return;
    fetch(`${settings.api}subtasks/${subtask.id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({
          subtask
        })
    })
    .then((response) => response.json())
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

  const updateName = (data) => {
    if(task.name !== data) {
      task.name = data;
      _updateTask()
    }
  }

  const updateDescription = (data) => {
    if(task.description !== data) {
      task.description = data;
      _updateTask()
    }
  }

  const updateSubTask = (id, data) => {

    let item = task.subtask.filter(item => item.id === id)[0];

    if (typeof data === "boolean"){
      (data)
      ? item.status = '0'
      : item.status = '1';
      _updateSubTask(item)
    }

    if (typeof data === "string"){
      if(item.name !== data) {
        item.name = data;
        _updateSubTask(item)
      }
    }

  }


  const updateReview = () => {
    setReview(!review)
    if(review) {
      task.is_review = '0'
    } else {
      task.is_review = '1';
    }
    _updateTask()
  };

  const showProjectSettings = () => {
  }


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


  useEffect(() => {
    _getTask();
    contextMenu();
  }, []);

  useEffect(() => {
    task.is_review === '1' && setReview(true);
  }, [task]);

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
        <li>
          <div className="card-text-wrapper">
            <div className="card-title-wrapper">
            <Textarea
              data={task.name}
              callback={updateName}
            />
            <input
              type="checkbox"
              value={task.is_review}
              checked={review}
              onChange={() => updateReview()}
            />
          </div>
        </div>
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
                callback={updateSubTask}
              />
            </li>
          )}
        </ul>
      }



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


        <ul>
          <span className="label pb2">Description</span>
          <li
          >
            <Textarea
              data={task.description}
              callback={updateDescription}
            />
          </li>
        </ul>


      </article>

      <FooterModal
        setModalState={setModalState}
        modalState={modalState}
      >
          <button
            className="btn btn--secondary"
            onClick={() => _createSubTask()}
          >New Sub Task</button>
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

export default Task
