import React, { useEffect, useRef, useState } from 'react';

const Ticket = (props: Props) => {
  return (
    <>
      <div>
      </div>
      <div>
      {
        props.children.map((v, i) => {
          return (
            <div key={i}>
            </div>
          )
        })
      }
      </div>
    </>
  );
};

type Props = {
  isOpen: boolean;
  children: Object[];
};

export default Ticket;
