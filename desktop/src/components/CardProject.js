const CardProject = ( { data }) => {

  return (

    <>
      <a data-project data-id={data.id}>
        <div className="pr3">IC</div>
        <div>
          <h2 className="pb1">{data.name}</h2>
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
