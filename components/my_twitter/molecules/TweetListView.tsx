import React, { useState, useEffect } from 'react';

export default (props) => {
  const [aggregate, setAggregate] = useState((Array.isArray(props.aggregate[0])) ? props.aggregate[0] : props.aggregate);
  const [pageNumber, setPageNumber] = useState(0);
  
  useEffect(() => {
    if (Array.isArray(props.aggregate[0])) setAggregate(props.aggregate[pageNumber]);
  }, [pageNumber]);
  
  const drawIndents = (tweet) => {
    if ('indents' in tweet) {
      const indents = Array(tweet.indents).fill(null);
      return (
        indents.map((v) => {
          return (<div style={{ backgroundColor: 'rgba(255, 255, 255, 1.0)', width: '1rem' }}></div>);
        })
      );
    }
  };
  
  return (
    <>
      <style>
      {
        `
          .tweet-list-view {
            .item {
              display: flex;
            }
            
            .content {
              flex: 1;
            }
          }
        `
      }
      </style>
      <div className="tweet-list-view">
        <div style={{ display: 'flex' }}>
          <div onClick={(e) => { if (0 < pageNumber) setPageNumber(pageNumber - 1);  }}>&lt;</div>
          <div style={{ width: '1rem' }}></div>
          <div onClick={(e) => { if (pageNumber < props.aggregate.length - 1) setPageNumber(pageNumber + 1); }}>&gt;</div>
        </div>
        {
          aggregate.map((v, index) => {
            return (
              <div key={index} className="item" className="item" style={{ ...props.style }}>
                { drawIndents(v) }
                <div className="content" dangerouslySetInnerHTML={{ __html: v.value }}></div>
              </div>
            )
          })
        }
      </div>
    </>
  );
};
