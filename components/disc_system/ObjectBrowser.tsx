import React, { forwardRef, useImperativeHandle, useState } from 'react';

export default forwardRef((props ,ref) => {
  const [aggregate, setAggregate] = useState([
    { type: 'Disc', identifier: 'dummy', top: 0, left: 0 },
  ]);
  
  useImperativeHandle(ref, () => {
    return {
    setAggregate: (value) => {
      setAggregate(value);
//      setAggregate(value.map((v) => { return v; }));
    }}
  });
  
  const apply = (lop) => {
    props.apply(lop);
  };
  
  const pushDisc = () => {
    props.pushDisc({
      identifier: document.getElementById('new-id').value,
      top: document.getElementById('new-top').value,
      left: document.getElementById('new-left').value,
      contentsForFrontInner: document.getElementById('new-contentsForFrontInner').value,
      contentsForBottomInner: document.getElementById('new-contentsForBottomInner').value,
    });
  }

  return (
    <div ref={ ref } className={ props.classes } style={ props.style }>
      <div>
        identifier:<br />
        <input id='new-id' type='text' /><br />
        top:<br />
        <input id='new-top' type='text' /><br />
        left:<br />
        <input id='new-left' type='text' /><br />
        contentsForBottomInner:<br />
        <input id='new-contentsForBottomInner' type='text' /><br />
        contentsForFrontInner:<br />
        <input id='new-contentsForFrontInner' type='text' /><br />
        <div style={{ border: '1px solid black' }} onClick={ (e) => { pushDisc(); } }>append</div>
      </div>
      <br />
      <br />
      <div>
        <div className='SilverGraduation' style={{ color: 'red', border: '1px solid white' }} onClick={ (e) => { apply() } }>apply</div>
        <div>
        {
          aggregate.map((v) => {
            return (
              <div>
                <div style={{ display: 'flex'}}>
                  <div style={{ height: '10px', minWidth: '100px', maxWidth: '100px', whiteSpace: 'nowrap', textOverflow: 'fade' }}>{ v.identifier }</div>
                  <input id={ v.identifier + '-top' } type='text' defaultValue={ v.top } style={{ width: '100px' }} />
                  <input id={ v.identifier + '-left' } type='text' defaultValue={ v.left } style={{ width: '100px' }} />
                  <input type='button'
                    onClick={
                      (e) => { apply({
                        identifier: v.identifier,
                        top: document.getElementById(`${v.identifier}-top`).value,
                        left: document.getElementById(`${v.identifier}-left`).value
                      }) }
                    }
                  />
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  );
})