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
  }, [])

  return (

    <>
      <div className={`subtask-wrapper pb2 ${checked && 'is-done'}`}>

        <span className={`checkbox-wrapper ${checked && 'is-checked'}`}>

          <input
            type="checkbox"
            value={data.status}
            checked={checked}
            onChange={() => handleClick()}
          />

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
