const CardTask = ( { data }) => {

  return (

    <>
      <a data-task data-id={data.id}>
        <h2>{data.name}</h2>
        {data.is_review === '1' &&
          <span className="icon">R</span>
        }
      </a>
    </>

  )
}

export default CardTask
