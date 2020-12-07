import react from "react";

const SettingsAPI = () => {

  const setUrl = (value) => {

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
            onChange={el => {setUrl(el.target.value)}}
            />
        </div>
      </div>

      </form>

  )
}

export default SettingsAPI
