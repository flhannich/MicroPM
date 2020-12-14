import { useState, useEffect } from "react";

import { Textarea } from './'

const CardSubTask = ( { data, callback }) => {

  const [checked, setChecked] = useState(false)

  const handleInput = (value) => {
    callback(data.id, value);
  };

  const handleClick = e => {
    setChecked(!checked);
    callback(data.id, checked);
  };

  useEffect(() => {
    data.status === '1' && setChecked(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    <>
      <div className={`card-subtask pb2 ${checked && 'is-done'}`}>

        <span className="checkbox-container">

          <input
            type="checkbox"
            value={data.status}
            checked={checked}
            onChange={() => handleClick()}
          />

          <span className="checkmark-container">
            <svg viewBox="0 0 100 100" className="ic-svg s10"> 
              <use xlinkHref="/assets/sprite.svg#checkmark"></use>
            </svg>
          </span>

        </span>


          {(!checked)
          ?   <Textarea
                subTaskId={data.id}
                data={data.name}
                callback={handleInput}
              />

          : <p
              data-subtask
              data-id={data.id}
            >
            {data.name}
            </p>
          }

      </div>
    </>

  )
}

export default CardSubTask
