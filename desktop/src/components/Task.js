import {useEffect, useState, useRef, useContext} from "react";

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import { TimerContext } from '../context/TimerContext';

import { taskTotalTime } from '../utils/helpers';

import { Header, CardSubTask, CardMessage, Documents, Textarea, CardMessageSend, FooterModal, Footer, ModalMessage, Dropdown, TimerList } from '../components';

// console.log(Notification);

// const { Menu, MenuItem, Notification } = window.remote;

const { Menu, MenuItem } = window.remote;

const Task = () => {

  const abortController = new AbortController();

  const auth = useContext(AuthContext);
  const app = useContext(AppContext);
  const timer = useContext(TimerContext);

  const token = auth.token;


  const [task, setTask] = useState([]);
  const [taskStatus, setTaskStatus] = useState();
  const [messages, setMessages] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [modalMessage, setModalMessage] = useState(false);
  const [modalMessageCallback, setModalStateCallback] = useState(null);
  const [messageRead, setMessageRead] = useState(0);
  const [isReview, setIsReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);
  const [dropdownState, setDropdownState] = useState(false);


  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const subTasksRef = useRef(subTasks);
  subTasksRef.current = subTasks;

  const documentsRef = useRef(documents);
  documentsRef.current = documents;

  console.log(task);
  
  const _getTask = () => {
    if(!token) return;
    fetch(`${app.api}/api/tasks/${app.task}`, {
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
      setTask(json)
      setDocuments(json.document)
      setTaskStatus(json.status)
    })
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
      },      
      signal: abortController.signal
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
      },
      signal: abortController.signal
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
      }),
      signal: abortController.signal
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
      signal: abortController.signal,
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
      body: JSON.stringify({task}),
      signal: abortController.signal,
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
      body: JSON.stringify({subtask}),
      signal: abortController.signal,
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
      body: JSON.stringify({name: selection}),
      signal: abortController.signal,
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
        'authorization': token
      },
      signal: abortController.signal,
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
        'authorization': token
      },
      signal: abortController.signal,
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


  const _storeDocuments = (documents) => {
    if(!token) return;
    const formData = new FormData();

    for (var i = 0; i < documents.length; i++) {
      formData.append('documents[]', documents[i], documents[i].name);
    }

    formData.append('authorization', token);
    formData.append('_method', 'put');

    fetch(`${app.api}/api/documents/${app.task}`, {
      method: "POST",
      body: formData
    })
    .then((response) => _getTask())
    .catch((error) => console.error(error))
    .finally(() => setModalState(false))
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
    // setModalMessage('Will be delete in 5s');
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

  const removeDocument = (id) => {
    _deleteDocument(id)
  
    const filteredDocuments = documentsRef.current.filter(item => item.id !== parseInt(id))
    setDocuments(filteredDocuments)
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

  const updateStatus = (status) => {
    if(task.status !== status) {
      task.status = status;
      setTaskStatus(status)
      _updateTask();
    }
  }



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
             removeDocument(e.target.dataset.id)
           }
         }))
       }
       if (e.target.dataset.message) {
         let selection = window.getSelection()
         menu.append(new MenuItem({
           label: "Create Subtask",
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

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    _getMessages(messageRead);

    return () => {
      abortController.abort();
    };
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

            {timer.time.id !== task.id && task.status === 'In Progress' &&

              <button 
                className="btn btn--small"
                onClick={() => timer.startTimer(task.id, task.name)}
                >
                  <svg viewBox="0 0 100 100" className="ic-svg s10"> 
                    <use xlinkHref="/assets/sprite.svg#play"></use>
                  </svg>
              </button>

            }


            {taskStatus === 'In Progress' &&

            <>

            <div className="dropdown-wrapper dropdown--left">

              <button
                className="btn btn--small mr2"
                onClick={() => setDropdownState(!dropdownState)}
              >
                {taskTotalTime(task.time)}
              </button>
              
              <Dropdown
                setDropdownState={setDropdownState}
                dropdownState={dropdownState}
              >
                <TimerList 
                  taskId={task.id}
                />

              </Dropdown>
            
            </div>


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

          {/* <div className="dropdown-wrapper pt1">

           <button 
              className="btn btn--status"
              onClick={() => setDropdownStatus(!dropdownStatus)}
              >
              {taskStatus}
            </button>

            <Dropdown
              setDropdownState={setDropdownStatus}
              dropdownState={dropdownStatus}
            >
              <button 
                onClick={() => updateStatus('In Progress')}
                className="btn btn--none">
                In Progress
              </button>
              <button 
                onClick={() => updateStatus('Completed')}
                className="btn btn--none">
                Completed
              </button>
              <button 
                onClick={() => updateStatus('Not Started')}
                className="btn btn--none">
                Not Started
              </button>
            </Dropdown>
    
            
          </div> */}

        </div>

        </li>
      </ul>



      {isReview &&
        <ul>
          <div className="title-wrapper">
            <span className="label">Requests</span>
            {(messageRead === 0)
              ? <button
                  className="btn btn--small"
                  onClick={() => {setMessageRead(1)}}
                  >
                Show All ({task.message_count})</button>
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
          {/* <CardMessageSend
            callback={storeMessage}
          />  */}
        </ul>
      }


      { subTasks.length > 0 &&
        <ul>
        <span className="label pb2">Subtasks</span>
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
        data={documents}
        callback={updateTasks}
      />


      </article>

      {/* <ModalMessage
        data={modalMessage}
        callback={setModalStateCallback}
      /> */}

      <FooterModal
        setModalState={setModalState}
        modalState={modalState}
      >
          <button
            className="btn btn--secondary"
            onClick={() => _createSubTask()}
          >Add Subtask</button>
          <button
            className="btn btn--secondary btn--upload">
            <input 
              type="file"  
              onChange={(event) => _storeDocuments(event.target.files)}
              multiple
            />  
          Upload Attachment</button>
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
