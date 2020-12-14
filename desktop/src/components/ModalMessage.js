import { useRef, useEffect, useState } from "react";

const ModalMessage = ( { data, callback } ) => {

  const node = useRef();

  const [modalState, setModalState] = useState(false);
  const [message, setModalMessage] = useState(null);

  let timer;

  useEffect(() => {

    setModalState(true);
    setModalMessage(data);


    timer = setTimeout(() => {

      setModalMessage(null);
      setModalState(false);
      callback(true);
      clearTimeout(timer);

    }, 5000);


  }, [data])

  

  const handleClick = e => {
    setModalMessage(null);
    setModalState(false);
    clearTimeout(timer);
  };


  return (

    <section
      onClick={handleClick}
      className={`modal ${modalState? "is-active":"is-hidden"}`}
      >
      <div className="pa1">
       {message}
      </div>
    </section>

  )
}

export default ModalMessage
