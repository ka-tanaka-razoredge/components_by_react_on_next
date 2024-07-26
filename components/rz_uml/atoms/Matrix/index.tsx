import React from 'react';

type Props = {
  subjects: [],
  topic: any,
  replies: [],
};

export default ({ subjects, topic, replies }) => {
  return (
    <div>
      <style>
      {
        `
          .cell {
            border: 1px solid black;
            flex: 1;
          }
          
          .mother-board {
            width: 250px;
          }
        `
      }
      </style>
      <div className="mother-board">
        <div style={{ display: 'flex' }}>
        {
          subjects.map((subject, index) => {
            return (
              <div key={index} className="cell">
                {subject}
              </div>
            )
          })
        }
        </div>
  
        <div className="cell" style={{ textAlign: 'center' }}>{topic}</div>
  
        <div style={{ display: 'flex' }}>
        {
          replies.map((reply, index) => {
            return (
              <div key={index} className="cell">
                {reply}
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  );
};
