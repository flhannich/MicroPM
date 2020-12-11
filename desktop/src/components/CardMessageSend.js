import { useRef } from "react";

const CardMessageSend = ( { data, callback, subTaskId }) => {

  const node = useRef();

  const handleClick = () => {
    (node.current.innerText !== '') &&
    callback(node.current.innerText)
    node.current.innerText = ''
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
        className="btn btn--icon"
        onClick={handleClick}
      >
        <svg viewBox="0 0 85 85" className="ic-svg s16"> 
          <use xlinkHref="/assets/sprite.svg#send"></use>
        </svg>
      </button>
    </div>
  )
}

export default CardMessageSend
