const Textarea = ( { data, callback, subTaskId }) => {

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
        dangerouslySetInnerHTML={{__html: data}}
      />
    </>
  )
}

export default Textarea
