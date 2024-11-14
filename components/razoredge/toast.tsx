import React, { useEffect, useRef, useState } from 'react';

import Toast from './atoms/Toast';

export default () => {
  const toast = useRef();
  const transfer = () => {
    console.log(toast.current);
    toast.current.dispatchEvent(new CustomEvent('show', { detail: { value: 'Hello, world!' } }));
  };

  return (
    <>
      <Toast ref={toast} />
      <br />
      <br />
      <button onClick={transfer}>trigger</button>
    </>
  );
};
