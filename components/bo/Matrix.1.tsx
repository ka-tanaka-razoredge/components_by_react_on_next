import React from 'react';

export default (props) => {
  
  // subjects.length
  
  return (
    <div style={{display: 'grid', gridTemplateRows: '1fr 1fr 1fr', gridTemplateColumns: '100px 1fr 100px'}}>
      {
        props.subjects.map((subject, index) => {
          let s = index + 1;
          let e = s + 1;
          const v = s + '/' + e;
          return (
            <div style={{gridRow: 1, gridColumn: v}}>{subject}</div>
          )
        })
      }
      <div style={{gridRow: 2, gridColumn: 1}}>{props.vbard}</div>
      {
        props.replies.map((reply) => {
          return (
            <div style={{gridRow: 3}}>{reply}</div>
          )
        })
      }
    </div>
  );
} 