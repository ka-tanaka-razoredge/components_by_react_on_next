import React from 'react';

export default (props) => {
  return (
    <>
      <style>
      {
        `
          .chapter {
            font-size: 48px;
            margin-top: 16px;
            margin-bottom: 16px;
          }

          .section {
            font-size: 20px;
            margin-left: 1rem;
            margin-right: 1rem;
          }

          .margin-1 {
            margin-left: 1rem;
            margin-right: 1rem;
          }

          .margin-2 {
            margin-left: 2rem;
            margin-right: 2rem;
          }
          
          .separator-kitty {
            height: 24px;
          }

          .separator-red-eye {
            height: 8px;
          }

          .separator-fallen-angel {
            height: 16px;
          }
          
        `
      }
      </style>
      <div className="chapter">
        {props.title}
      </div>
      <div className="separator-kitty" />
      <div>
        {props.children}
      </div>
    </>
  );  
};
