import {useState} from 'react';

const CardProject = ( { data }) => {
  
  return (

    <>

      <span 
        data-project 
        data-id={data.id}
      >
          <svg viewBox="0 0 100 100" className="ic-svg mr3 s16"> 
            <use xlinkHref="/assets/sprite.svg#folder"></use>
          </svg>
        <div className="card-text-wrapper">

          <div className="card-title-wrapper">
  
            <h2>{data.name}</h2>
            <div className="card-icon-wrapper">
              {data.is_sync === '1' &&
                <svg viewBox="0 0 100 100" className="ic-svg svg--brand s16 mr2"> 
                  <use xlinkHref="/assets/sprite.svg#sync"></use>
                </svg>
              }
            </div>
          </div>
          {(data.client !== null && data.client !== undefined)
            ? <span className="info">{data.client.name}</span>
            : <span className="info">Personal</span>
          }
        </div>

      </span>
    </>

  )
}

export default CardProject
