import react, { useContext, useEffect, useState } from "react";

import { CardDocument } from './'

import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';
import { AppContext } from '../context/AppContext';

const Documents = ( { data, callback }) => {

  const settings = useContext(SettingsContext);
  const token = useContext(AuthContext).token;
  const app = useContext(AppContext);

  const [documents, setDocuments] = useState([]);


  const _storeDocuments = (documents) => {
    if(!token) return;
    const formData = new FormData();

    for (var i = 0; i < documents.length; i++) {
      formData.append('documents[]', documents[i], documents[i].name);
    }

    formData.append('authorization', token);
    formData.append('_method', 'put');

    fetch(`${settings.api}/api/documents/${app.task}`, {
      method: "POST",
      body: formData
    })
    .then((response) => response.json())
    // .then((json) => callback())
    .catch((error) => console.error(error))
  }

  const _deleteDocuments = () => {
    if(!token) return;
    fetch(`${settings.api}/api/documents/${app.task}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token,
      },
    })
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }

  const onDragOver = event => {
    event.preventDefault();
  }

  const onDrop = event => {
    _storeDocuments(event.dataTransfer.files)
  }

  // useEffect(() => {
  //   _storeDocuments()
  // }, [documents])

  return (

    <>
    { data.document.length > 0 &&
      <ul>
      <span className="label pb2">Attachments</span>
        {data.document.map((item, index) =>

          <li>
            <CardDocument
              data={item}
            />
          </li>
        )}

        <div
          onDragEnter={() => console.log('onDragEnter')}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e)}
        >
          Drag and drop document here
        </div>
      </ul>
    }
    </>

  )
}

export default Documents
