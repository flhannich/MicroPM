const CardProject = ( { data }) => {

  return (

    <>
      <a data-project data-id={data.id}>
        <div className="pr3">IC</div>
        <div className="card-text-wrapper">
          <div className="card-title-wrapper">
            <h2 className="pb1">{data.name}</h2>
            <span className="count">{data.tasks_count}</span>
          </div>
          {(data.client !== null && data.client !== undefined)
            ? <span className="info">{data.client.name}</span>
            : <span className="info">Personal</span>
          }
        </div>

      </a>
    </>

  )
}

export default CardProject
