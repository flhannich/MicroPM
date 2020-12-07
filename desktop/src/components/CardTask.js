const CardTask = ( { data }) => {

  return (

    <>
      <a data-task data-id={data.id}>
        <h2>{data.name}</h2>
      </a>
    </>

  )
}

export default CardTask
