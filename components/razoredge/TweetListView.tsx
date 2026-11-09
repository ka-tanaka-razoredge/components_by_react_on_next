import React, { useState, useEffect } from 'react';

type Props = {
  aggregate: any[];
  style?: any;
  source?: string;
};

export default (props: Props) => {
  const [aggregate, setAggregate] = useState((Array.isArray(props.aggregate[0])) ? props.aggregate[0] : props.aggregate);
  const [pageNumber, setPageNumber] = useState(0);
  
  useEffect(() => {
    if (Array.isArray(props.aggregate[0])) setAggregate(props.aggregate[pageNumber]);
  }, [props.aggregate, pageNumber]);

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
            if (!props.source) {
              return (
                <div key={index} className="item" style={{ ...props.style }}>
                  { drawIndents(v) }
                  <div dangerouslySetInnerHTML={{ __html: v.value }}></div>
                </div>
              )
            } else {
              return (
                <div key={index} style={{ padding: '0.25rem 0.25rem', ...props.style }}>
                  <div style={{ display: 'flex' }} onClick={() => {}}>
                    <div>id: </div>
                    <div>{v.tweetId}</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', backgroundColor: 'white' }}>
                      { drawIndents(v) }
                      <div dangerouslySetInnerHTML={{ __html: v.value }}></div>
                    </div>
                  </div>
                  <div>
                    <button>reply</button>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    </>
  );
};
