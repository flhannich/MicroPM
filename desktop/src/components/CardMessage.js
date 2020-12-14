import {useContext} from "react";

import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

import { AuthContext } from '../context/AuthContext';

const CardMessage = ( { data, callback }) => {

  const auth = useContext(AuthContext);

  const elapsedTime = (time) => {
    return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de })
  }


  return (

    <>
      <div
        className={`message-wrapper mt2 pt2 pl3 pr3 pb3 ${auth.username === data.user.name && "message-user"}`}
      >
        <div>
          <span className="info">{elapsedTime(data.updated_at)}</span>
        </div>
        <p
          className="pt2"
          data-message
          data-id={data.id}
        >{data.message}</p>
      </div>
    </>

  )
}

export default CardMessage
