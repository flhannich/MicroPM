import {useContext} from "react";

import { AppContext } from '../context/AppContext';

const CardDocument = ( { data }) => {

const app = useContext(AppContext);

  return (

    <span data-document data-id={data.id}>

    { (data.type === 'image/jpeg' || data.type === 'image/png')

    ? <div className="card-document">
        <div className="image" style={{backgroundImage: `url(${app.api}/${data.path}${data.name})`}} />
        <div className="description">
          <span className="label">{data.name}</span>
        </div>
      </div>

    : <div className="card-document">
        <div className="document">
          <span className="icon">D</span>
        </div>
        <div className="description">
          <span className="label">{data.name}</span>
        </div>
      </div>
    }


    </span>

  )
}

export default CardDocument
