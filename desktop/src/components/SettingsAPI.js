import { useContext, useState } from "react";

import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';

const SettingsAPI = () => {


    const token = useContext(AuthContext).token;
    const settings = useContext(SettingsContext);
    const [api, setApi] = useState('')

    const _updateSettings = () => {
      if(!token) return;
      fetch(`http://192.168.178.35:8000/api/settings`, {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': token,
        },
        body: JSON.stringify({
            api: api
          })
      })
      .then((response) => response.json())
      .then((json) => settings.setSettings(json))
      // .then((json) => console.log(json))
      .catch((error) => console.error(error))
    }

  const update = event => {
    event.preventDefault();
    _updateSettings();
  }

  return (

    <form
      className={`contact-form pt4 pb4`}
      action=""
      >

      <div className="form-group pb4">
        <div className={`group-item}`}>
          <label htmlFor="url">Your Api</label>
          <input
            type="text"
            data-type="url"
            name="url"
            max-length="200"
            placeholder="https://example.com/api"
            onChange={el => {setApi(el.target.value)}}
            />
        </div>
      </div>

      <div className="form-group pb3">
        <div className="group-item">
          <button
            type="submit"
            onClick={update}
          >Save</button>
        </div>
      </div>

      </form>

  )
}

export default SettingsAPI
