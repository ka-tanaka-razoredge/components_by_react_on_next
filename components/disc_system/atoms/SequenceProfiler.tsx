import React from 'react';

export default (props) => {
  return (
    <>
      <style>
      {
        `
          .ground {
            border: 1px solid black;
            margin-left: 4px;
            margin-right: 4px;
            background-color: rgba(240, 240, 240, 1.0);
          }
          
          .tags {
            display: flex;
            margin-left: 4px;
            margin-right: 4px;
            padding: 4px 4px;
            background-color: white;
          }
          
          .body {
            height: 100px;
            border: 1px solid black;
            margin: 0px 4px 4px 4px;
            background-color: white;
          }
        `
      }
      </style>
      <div className="ground">
        <div>identifier:</div>
        <div>tags:</div>
        <div className="tags">
        {
          props.tags && props.tags.map((v) => {
            return (
              <div className="Tag">
                {v}
              </div>
            )
          })
        }
        </div>
        <div>responsibility:</div>
        <div className="body"
          dangerouslySetInnerHTML={{ __html: props.responsibility }}
        >
        </div>
        <div>
          <div>summary:</div>
          <div className="body">
            {props.summary}
          </div>
        </div>
      </div>
    </>
  );
};
