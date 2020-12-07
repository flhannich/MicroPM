import { useState } from "react";

const Textarea = ( { data, callback, subTaskId }) => {

  const [value, setValue] = useState(data)

  const handleBlur = event => {
    callback(event.target.innerText);
  }

  return (
    <>
      <div
        className="editable"
        contentEditable={true}
        data-subtask
        data-id={subTaskId}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{__html: value}}
      />
    </>
  )
}

export default Textarea
