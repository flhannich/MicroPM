import { useRef, useState, useContext, useEffect } from 'react';
import { SettingsClient, Footer, FooterModal, Textarea } from './'

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

const { Menu, MenuItem } = window.remote;

const ClientList = ({ callback }) => {

  const abortController = new AbortController();

  const token = useContext(AuthContext).token;
  const app = useContext(AppContext);

  const [clients, setClients] = useState([]);
  const [activeClient, setActiveClient] = useState(null);
  const [clientPassword, setClientPassword] = useState(null);
  const [modalState, setModalState] = useState(false);

  const clientsRef = useRef(clients);
  clientsRef.current = clients;
  

  const _createClient = () => {
    if(!token) return;
    fetch(`${app.api}/api/client`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({
        name: 'New Client',
      })
    })
    .then((response) => response.json())
    .then((json) => {
      setClients(clients.concat(json));
      // callback(json);
    })
    .catch((error) => console.error(error))
  }


  const _updateClientPassword = (id) => {
    if(!token) return;
    fetch(`${app.api}/api/client/${id}/password`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
    .then((response) => response.json())
    .then((json) => {
      setClientPassword(json);
    })
    .catch((error) => console.error(error))
  }


  const _updateClient = (value, id) => {
    if(!token) return;
    fetch(`${app.api}/api/client/${id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify({
        name: value,
      })
    })
    .catch((error) => console.error(error))
  }


  const _deleteClient = (id) => {
    if(!token) return;
    fetch(`${app.api}/api/client/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
    .catch((error) => console.error(error))
  }
  

  const editClient = (id) => {
    setActiveClient(id)
  }


  const generateKey = (id) => {
    _updateClientPassword(id);
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

  const deleteClient = (id) => {
    _deleteClient(id);
    const filteredClients = clientsRef.current.filter(item => item.id !== parseInt(id))
    setClients(filteredClients)
  };


  const handleCallback = (data) => {
    callback(data)
  };


  const handleBlur = (value) => {
    if(value !== '') {
      _updateClient(value, activeClient)
      setActiveClient(null);
    }
  };


  const handleFocus = (elem) => {
    setTimeout(function() {
      elem.firstChild.focus();
    }, 0);
  };


  useEffect(() => {
    contextMenu();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  useEffect(() => {
    if(app.api !== null) {
      _getClients();
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.api]);



  const contextMenu = () => {
    window.addEventListener('contextmenu', (e) => {
       const menu = new Menu();
       if (e.target.dataset.client) {
         menu.append(new MenuItem({
           label: "Edit Client",
           click: () => {
             handleFocus(e.target.parentNode)
             setActiveClient(e.target.dataset.id);
           }
         }));
         menu.append(new MenuItem({
          type: "separator",
        }));
         menu.append(new MenuItem({
           label: "Generate New Key",
           click: () => {
             generateKey(e.target.dataset.id)
           }
         }));
         menu.append(new MenuItem({
          type: "separator",
        }));
         menu.append(new MenuItem({
          label: "Delete Client",
          click: () => {
           deleteClient(e.target.dataset.id)
          }
        }));
       }
       menu.popup({ window: window.remote.getCurrentWindow() })
     }, false)
  }

  return (

    <>
          { clients.map((item, index) => 

            <div 
              key={index}
              className="client-list-wrapper" 
            >

          {(parseInt(activeClient) === item.id)

          ?  <Textarea
               data={item.name}
               callback={handleBlur}
            />

          : <p
              data-client
              data-id={item.id}
              onClick={() => handleCallback(item)}
            >
            {item.name}
            </p>

          }

            </div>
        )}

            <div className="client-list-footer pt2">

              <button 
                className="btn btn--icon"
                onClick={_createClient}
                >
                <svg viewBox="0 0 100 100" className="ic-svg s16"> 
                  <use xlinkHref="/assets/sprite.svg#add"></use>
                </svg>
              </button>

            </div>
    </>

  )
}

export default ClientList
