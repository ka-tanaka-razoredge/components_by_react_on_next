import React, { useState, useRef } from 'react';

export default ({
  options = [
    `<span style="color: red">江戸風</span>`,
    `<span style="color: blue">京都風</span>`,
  ]
}) => {
  const divForOptions = useRef();
  const [selectedOption, setSelectedOption] = useState(options[0]);
  
  const toggle = () => {
    divForOptions.current.style.height = (divForOptions.current.style.height === '0px') ? `auto` : '0px';
  };
  
  const onSelected = (e) => {
    console.log(e);
  };
  
  return (
    <div>
      <style>
      {
        `
          .represent {
          }

          .options {
            position: absolute;
            left: 1rem;
            overflow: hidden;
            top: ${options.length + 1} + rem;
          }
        `
      }
      </style>
      <div className="represent" style={{ display: 'flex' }}>
        <div style={{ whiteSpace: 'nowrap' }}><div dangerouslySetInnerHTML={{ __html: selectedOption }}></div></div><div onClick={toggle}>▼</div>
      </div>
      <div ref={divForOptions} className="options" style={{ height: '0px',  }}>
      {
        options.map((option, index) => {
          return (
            <div key={index} onClick={onSelected}>
              <div dangerouslySetInnerHTML={{ __html: option }}></div>
            </div>
          )
        })
      }
      </div>
    </div>
  );
};
