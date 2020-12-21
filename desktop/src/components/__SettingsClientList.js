import { useState, useContext, useEffect } from 'react';
import { SettingsClient, Footer, FooterModal, Textarea } from './'

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

const SettingsClients = ( ) => {

  const token = useContext(AuthContext).token;
  const app = useContext(AppContext);


  const [clients, setClients] = useState([]);
  const [activeClient, setActiveClient] = useState(null);
  const [modalState, setModalState] = useState(false);

  console.log(activeClient);
  
  const _createClient = () => {

  }
  
  const _getClientSingle = (id) => {
    if(!token) return;
    fetch(`${app.api}/api/client/${id}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
    .then((response) => response.json())
    .then((json) => {
      setActiveClient(json)
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
      }
    })
    .then((response) => response.json())
    .then((json) => {
      setClients(json)
    })
    .catch((error) => console.error(error))
  }

  const handleInput = (value) => {
    console.log(value);
  };

  useEffect(() => {
    if(app.api !== null) {
      _getClients();
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.api]);

  return (

    <>


        <SettingsClient 
          data={activeClient}
        />

        <ul>
        { clients.map((item, index) => 
          <li
            key={index}
          >
            <a
              onClick={() => _getClientSingle(item.id)}
            >
            {item.name}
            </a>
          </li>
        )}
        </ul>

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
              onClick={() => _createClient()}
            >New Client</button>
        </FooterModal>
        
    </>

  )
}

export default SettingsClients
