import react from "react";

const CardFile = ( { data }) => {

console.log(data);
  return (

    <>

    {data.type === 'image' &&
      <div className="card-file">
        <div className="image" style={{backgroundImage: `url(${data.path})`}} />
      </div>
    }

    {data.type === 'document' &&
      <div className="card-file">
        <div className="document">
          <span className="icon">D</span>
          <a href={data.url}>{data.name}</a>
        </div>
      </div>
    }

    </>

  )
}

export default CardFile
