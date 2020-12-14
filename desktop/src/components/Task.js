import {useEffect, useState, useRef, useContext} from "react";

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import { TimerContext } from '../context/TimerContext';

import { taskTotalTime } from '../utils/helpers';

import { Header, CardSubTask, CardMessage, Documents, Textarea, CardMessageSend, FooterModal, Footer } from '../components';

// console.log(Notification);

// const { Menu, MenuItem, Notification } = window.remote;

const { Menu, MenuItem } = window.remote;

const Task = () => {

  const auth = useContext(AuthContext);
  const app = useContext(AppContext);
  const timer = useContext(TimerContext);

  const token = auth.token;
  // const token = auth.token;
  // const username = auth.username;

  const [task, setTask] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [messageRead, setMessageRead] = useState(0);
  const [isReview, setIsReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const subTasksRef = useRef(subTasks);
  subTasksRef.current = subTasks;

  const _getTask = () => {
    if(!token) return;
    fetch(`${app.api}/api/tasks/${app.task}`, {
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

  const _getMessages = (status) => {
    if(!token) return;
    fetch(`${app.api}/api/messages/${app.task}/${status}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
    .then((response) => response.json())
    .then((json) => setMessages(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }

  const _getSubTasks = (taskId) => {
    if(!token) return;
    fetch(`${app.api}/api/subtasks/${app.task}`, {
      method: "GET",
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

  const _createMessage = ( data ) => {
    if(!token) return;
    fetch(`${app.api}/api/messages`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({
        message: data,
        task: app.task
      })
    })
    .then((response) =>  _getMessages(messageRead))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }


  const _deleteMessage = ( id ) => {
    if(!token) return;
    fetch(`${app.api}/api/messages/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
    })
    .catch((error) => console.error(error))
  }

  const _updateTask = () => {
    if(!token) return;
    fetch(`${app.api}/api/tasks/${app.task}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({task})
    })
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }

  const _updateSubTask = (subtask) => {
    if(!token) return;
    fetch(`${app.api}/api/subtasks/${subtask.id}`, {
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
    .catch((error) => console.error(error))
  }


  const _createSubTask = (selection) => {
    if(!token) return;
    fetch(`${app.api}/api/subtasks/${app.task}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({name: selection})
    })
    .then((json) => _getSubTasks())
    .catch((error) => console.error(error))
    .finally(() => setModalState(false))
  }


  const _deleteSubTask = (subTaskId) => {
    if(!token) return;
    fetch(`${app.api}/api/subtasks/${subTaskId}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
    .catch((error) => console.error(error))
  }


  const _deleteDocument = (id) => {
    if(!token) return;
    fetch(`${app.api}/api/documents/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
    })
    .then((response) => _getTask())
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

    let item = subTasks.filter(item => item.id === id)[0];

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

  const removeSubTask = (id) => {
    _deleteSubTask(id)

    const filteredSubTasks = subTasksRef.current.filter(item => item.id !== parseInt(id))
    setSubTasks(filteredSubTasks)
  }

  const storeMessage = ( data ) => {
    _createMessage(data)
  }

  const removeMessage = (id) => {
    _deleteMessage(id)

    const filteredMessages = messagesRef.current.filter(item => item.id !== parseInt(id))
    setMessages(filteredMessages)
  }

  const updateTasks = () => {
    _getTask()
  }

  const updateReview = () => {
    setIsReview(!isReview)
    if(isReview) {
      task.is_review = '0'
    } else {
      task.is_review = '1';
    }
    _updateTask()
  };


  console.log('render');

  const contextMenu = () => {
    window.addEventListener('contextmenu', (e) => {
       const menu = new Menu();
       if (e.target.dataset.subtask) {
         menu.append(new MenuItem({
           label: "Delete Subtask",
           click: () => {
             removeSubTask(e.target.dataset.id)
           }
         }));
       }
       if (e.target.dataset.document) {
         // console.log(new MenuItem());
         menu.append(new MenuItem({
           label: "Delete Attachment",
           click: () => {
             _deleteDocument(e.target.dataset.id)
           }
         }))
       }
       if (e.target.dataset.message) {
         let selection = window.getSelection()
         menu.append(new MenuItem({
           label: "Create Subtask from Selection",
           click: () => {
             _createSubTask(selection.toString())
           }
         }));
         menu.append(new MenuItem({
           type: "separator",
         }));
         menu.append(new MenuItem({
           label: "Delete Message",
           click: () => {
             removeMessage(e.target.dataset.id)
           }
         }));
       }
       menu.popup({ window: window.remote.getCurrentWindow() })
     }, false)
  }


  useEffect(() => {
    _getTask();
    _getSubTasks();
    contextMenu();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    _getMessages(messageRead);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageRead]);


  useEffect(() => {
    task.is_review === '1' && setIsReview(true);
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

            {task.status === 'In Progress' &&
            <>
            {timer.time.id !== task.id &&

              <button
                className="btn btn--icon"
                onClick={() => timer.startTimer(task.id, task.name, task.time[0].time)}
              >
                <svg viewBox="0 0 100 100" className="ic-svg s10"> 
                  <use xlinkHref="/assets/sprite.svg#play"></use>
                </svg>
              </button>

            }

            <button
              className="btn btn--small mr2"
            >
              {taskTotalTime(task.time)}
            </button>

            <span className="checkbox-status-container">

              <input
                type="checkbox"
                value={task.is_review}
                checked={isReview}
                onChange={() => updateReview()}
              />

              <span className="checkmark-container">
                <svg viewBox="0 0 100 100" className="ic-svg s16"> 
                  <use xlinkHref="/assets/sprite.svg#review"></use>
                </svg>
              </span>

            </span>
          </>
          }
          </div>

        </div>
        </li>
      </ul>



      {isReview &&
        <ul>
          <div className="title-wrapper pb2">
            <span className="label">Messages</span>
            {(messageRead === 0)
              ? <button
                  className="btn btn--small"
                  onClick={() => {setMessageRead(1)}}
                  >
                Show All</button>
              : <button
                  className="btn btn--small"
                  onClick={() => {setMessageRead(0)}}
                  >
                Hide</button>
            }
          </div>

          {messages.length > 0 &&
            messages.map((item, index) =>
              <li
                key={index}
              >
                <CardMessage
                  key={index}
                  data={item}
                />
              </li>
            )
          }
          <CardMessageSend
            callback={storeMessage}
          />
        </ul>
      }



      { subTasks.length > 0 &&
        <ul>
        <span className="label pb2">Sub Tasks</span>
          {subTasks.map((item, index) =>
            <li
              key={index}
            >
              <CardSubTask
                key={index}
                data={item}
                callback={updateSubTask}
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


      <Documents
        data={task}
        callback={updateTasks}
      />


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

export default Task
