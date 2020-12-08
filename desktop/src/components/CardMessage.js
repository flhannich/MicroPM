import react from "react";

import { format } from "date-fns"
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

const CardMessage = ( { data, callback }) => {

  const elapsedTime = (time) => {
    return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de })
  }

  return (

    <>
      <div
        className="message-wrapper pa3 mb2"
      >
        <div>
          <span className="author pr1">{data.user.name}</span>
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
