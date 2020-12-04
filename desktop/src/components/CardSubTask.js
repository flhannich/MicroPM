import react from "react";

const CardSubTask = ( { data }) => {

  return (

    <>
      <a data-subtask data-id={data.id}>
        <h2>{data.name}</h2>
      </a>
    </>

  )
}

export default CardSubTask
