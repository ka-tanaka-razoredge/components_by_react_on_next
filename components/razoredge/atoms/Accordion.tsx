// @ts-nocheck

import React, { useEffect, useImperativeHandle, useState, useRef } from 'react';

export type ComboItem = {
  subject: string;
  represent?: boolean;
};

export default React.forwardRef((props, ref) => {
  const members = useRef();
  const [aggregate, setAggregate] = useState([]);
  const [representer, setRepresenter] = useState('');
  
  useImperativeHandle(ref, () => ({
    setAggregate: (value) => {
      setAggregate(value);
      setRepresenter(value.find(v => v.represent));
    }
  }));
  
  const toggle = () => {
    if (parseInt(members.current.style.height) === 0) {
      members.current.style.height = 'auto';
    } else {
      members.current.style.height = '0px';
    }
  };
  
  useEffect(() => {
    setRepresenter(props.aggregate.find(v => v.represent));
    setAggregate(props.aggregate);
  }, []);
  
  return (
    <div>
      <div onClick={(e) => { toggle(); }} dangerouslySetInnerHTML={{ __html: representer.subject }}></div>
      <div ref={members} style={{ height: 'auto', overflow: 'hidden' }}>
      {
        aggregate.map((v, i) => {
          if (!v.represent) return (
            <div key={i} dangerouslySetInnerHTML={{ __html: v.subject }}>
            </div>
          )
        })
      }
      </div>
    </div>
  );
});
