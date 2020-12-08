import { useRef } from "react";

const CardMessageSend = ( { data, callback, subTaskId }) => {

  const node = useRef();

  const handleClick = () => {
    callback(node.current.innerText)
  }

  return (
    <div className="message-send-wrapper">
      <div
        ref={node}
        className="editable"
        contentEditable={true}
        data-subtask
        data-id={subTaskId}
        dangerouslySetInnerHTML={{__html: data}}
      />
      <button
        className="message"
        onClick={handleClick}
      >
      S
      </button>
    </div>
  )
}

export default CardMessageSend
