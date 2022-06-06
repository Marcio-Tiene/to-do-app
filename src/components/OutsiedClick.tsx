/* eslint-disable import/prefer-default-export */
import React, {
  useRef, useEffect, ReactNode, MutableRefObject,
} from 'react';

interface IOutisdeClick{
  callback: () => void
  children:ReactNode
  className?:string
}

function useOutsideAlerter(ref:MutableRefObject<any>, callback = () => {}) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export function OutsideClick({ callback, children, className }:IOutisdeClick) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, callback);
  return <span className={className} ref={wrapperRef}>{children}</span>;
}
