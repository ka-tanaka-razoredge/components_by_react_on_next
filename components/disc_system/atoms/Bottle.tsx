import React from 'react';

export default (props) => {
  return (
    <>
      <style>
      {
        `
          .bottle {
          }
        `
      }
      </style>
      <div className="bottle">
      {
        props.tags.map((v) => {
          return (
            <div>
              {v}
            </div>
          )
        })
      }
      </div>
    </>
  );
};
