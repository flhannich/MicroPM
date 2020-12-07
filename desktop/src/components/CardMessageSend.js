import { useState } from "react";

const CardMessageSend = ( { data, callback, subTaskId }) => {

  const [value, setValue] = useState(data)

  const handleBlur = event => {
    callback(event.target.innerText);
  }

  return (
    <div className="message-send-wrapper">
      <div
        className="editable"
        contentEditable={true}
        data-subtask
        data-id={subTaskId}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{__html: value}}
      />
      <button
        className="message"
      >
      S
      </button>
    </div>
  )
}

export default CardMessageSend
