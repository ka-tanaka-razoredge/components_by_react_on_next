import React from 'react';

export default (props) => {
  
  // subjects.length
  
  return (
    <div>
      <table style={{ border: '1' }}>
        <tr>
        {
          props.subjects.map((subject, index) => {
            return (
              <td>{subject}</td>
            )
          })
        }
        </tr>
        <tr>
          <td>{props.vbard}</td>
        </tr>
        <tr>
        {
          props.replies.map((reply) => {
            return (
              <td style={{gridRow: 3}}>{reply}</td>
            )
          })
        }
        </tr>
      </table>
    </div>
  );
} 