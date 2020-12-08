const CardTask = ( { data }) => {

  return (

    <>
      <a data-task data-id={data.id}>
        <h2>{data.name}</h2>
        <div>
          {data.is_review === '1' &&
            <span className="icon">R</span>
          }
          {data.unread_message_count > 0 &&
            <span className="icon">U</span>
          }
        </div>
      </a>
    </>

  )
}

export default CardTask
