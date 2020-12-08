import {useContext} from "react";


import { SettingsContext } from '../context/SettingsContext';


const CardDocument = ( { data }) => {

console.log(data);

const settings = useContext(SettingsContext);

  return (

    <a data-document data-id={data.id} href={data.url}>

    { data.type === 'image/jpeg' || data.type === 'image/png' &&

      <div className="card-document">

        <div className="image" style={{backgroundImage: `url(${settings.api}/${data.path}${data.name})`}} />
        <div className="description">
          <span className="label">{data.name}</span>
        </div>
      </div>
    }

    {data.type === 'document' &&
      <div className="card-document">
        <div className="document">
          <span className="icon">D</span>
        </div>
        <div className="description">
          <span className="label">{data.name}</span>
        </div>
      </div>
    }

    </a>

  )
}

export default CardDocument
