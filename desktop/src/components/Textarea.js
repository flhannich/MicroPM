import react, { useState, useRef, useEffect } from "react";

const Textarea = ( { data, subTaskId }) => {

  const handleBlur = () => {
    console.log('update text')
  }

  return (
<>

      <div
        className="editable"
        contentEditable={true}
        data-subtask
        data-id={subTaskId}
        onBlur={() => handleBlur()}
        dangerouslySetInnerHTML={{__html: data}}
      />


</>
  )
}

export default Textarea
