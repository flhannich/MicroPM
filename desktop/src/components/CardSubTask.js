import react, { useState, useEffect, useRef } from "react";

import { Textarea } from './'

const CardSubTask = ( { data }) => {

  const [checked, setChecked] = useState(false)
  const [name, setName] = useState(data.name)

  const handleClick = e => {
    setChecked(!checked);
    console.log('store status')
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
            onClick={() => handleClick()}
          />

        </span>

          {(!checked)
          ?   <Textarea
                subTaskId={data.id}
                data={name}
                setData={setName}
              />

          : <p
              data-subtask
              data-id={data.id}
            >
            {name}
            </p>
          }

      </div>
    </>

  )
}

export default CardSubTask
