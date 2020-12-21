import { useContext, useState } from "react";

import { CardDocument } from './'

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';


const Documents = ( { data, callback }) => {

  const token = useContext(AuthContext).token;
  const app = useContext(AppContext);

  const [dropState, setDropState] = useState(false);

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
    .then((response) => response.json())
    .then((json) => {
      callback()
      setDropState(false)
    })
    .catch((error) => console.error(error))
  }

  const onDragOver = event => {
    event.preventDefault();
    setDropState(true);
  }

  const onDragLeave = event => {
    event.preventDefault();
    setDropState(false);
  }

  const onDrop = event => {
    _storeDocuments(event.dataTransfer.files)
  }


  return (
    <>
        <ul
        className={`dropzone ${dropState && 'is-active'}`}
        onDragLeave={(e) => onDragLeave(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e)}
        >
        <span className="label pb2">Attachments</span>
          {data.map((item, index) =>
            <li
              key={index}
            >
              <CardDocument
                data={item}
              />
            </li>
          )}
        </ul>

    </>

  )
}

export default Documents
