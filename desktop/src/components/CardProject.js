import react from "react";

const CardProject = ( { data }) => {
console.log(data);
  return (

    <>
      <a data-project data-id={data.id}>
        <div className="pr3">IC</div>
        <div>
        <h2>{data.name}</h2>
        {data.client !== null
          ? <span className="info">{data.client.name}</span>
          : <span className="info">Personal</span>
        }
        </div>
      </a>
    </>

  )
}

export default CardProject
