import React,{useEffect,useRef} from "react";


// Outside click detection

export const useOutsideClick = (callback) => {
    const ref = useRef();
  
    useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
  
      document.addEventListener('click', handleClick, true);
      // showDropdown();
  
      return () => {
        document.removeEventListener('click', handleClick, true);
        // showDropdown();
      };
    }, [ref]);
  
    return ref;
  };