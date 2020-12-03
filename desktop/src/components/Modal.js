import react, { useRef, useState, useEffect } from "react";

const Modal = ( { children, modalState, setModalState }) => {

  const node = useRef();

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setModalState(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (

    <section

      className={`modal ${modalState? "is-active":"is-hidden"}`}
      ref={node}
      >
      <div className="pa1">
      {children}
      </div>
    </section>

  )
}

export default Modal
