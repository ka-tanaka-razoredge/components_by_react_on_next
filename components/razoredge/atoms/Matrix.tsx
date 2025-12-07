import React from 'react';

export default (props) => {
  
  const width = props.width;
  
  const giveWidth = () => {
    if (props.vbards.length < props.subjects.length) {
      return props.subjects.length * parseInt(props.width) + 'px';
    } else {
      return props.vbards.length * parseInt(props.width) + 'px';
    }
  };
  
  const giveWidthForTheLine = () => {
    return props.vbards.length * parseInt(props.width) + 'px';
  };
  
  return (
    <div style={{ width: giveWidth() }}>
      {
        !props.withoutName && (<div>name: {props.name}</div>)
      }
      <div style={{ display: 'flex', width: giveWidth(), justifyContent: 'center' }}>
      {
        props.subjects.map((subject) => {
          return (
            <div style={{ width: width, border: '1px solid rgba(0, 0, 0, 1.0)' }}>{subject}</div>
          )
        })
      }
      </div>
      <div style={{ display: 'flex', width: giveWidthForTheLine(), margin: '0 auto' }}>
      {
        props.vbards.map((vbard) => {
          return (
            <div style={{ width: width, border: '1px solid red' }}>{vbard}</div>
          )
        })
      }
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {
        props.replies.map((reply) => {
          return (
            <div style={{ width: width, border: '1px solid rgba(0, 0, 0, 1.0)' }}>{reply.join(', ')}</div>
          )
        })
      }
      </div>
    </div>
  );
} 