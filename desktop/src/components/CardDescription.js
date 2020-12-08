import { useEffect, useRef } from "react";

import { Textarea } from './'
const CardDescription = ( { data }) => {

  const node = useRef();

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);


  return (

    <>
      <div
        className="subtask-wrapper pb2 pt2"
      >
        <input type="checkbox" />
        <Textarea
          data={data.name}
        />
        }

      </div>
    </>

  )
}

export default CardDescription
