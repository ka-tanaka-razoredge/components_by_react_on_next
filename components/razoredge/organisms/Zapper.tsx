import React, { useState } from 'react';
import Pager from '../../components/atoms/Pager';

export default (props) => {
  const [aggregate, setAggregate]  = useState(props.contents);
  const [currentPage, setCurrentPage] = useState(0);
  
  const doIt = (e, record) => {
    props.zap(e, record.body);
  };
  
  const draw = () => {
    return aggregate[currentPage].map((v, index) => {
      const drawIndent = () => {
        const indents = new Array(v.indents).fill({});
        return (
          <>
            {
              indents.map((v, i) => (<div key={i} style={{ width: '1rem' }}></div>))
            }
          </>
        );
      };

      return (
        <div style={{ display: 'flex' }}>
          { drawIndent() }
          <div className='ChannelButton' onClick={ (e) => { doIt(e, v); } }  dangerouslySetInnerHTML={{ __html: v.value }}></div>
        </div>
      );
    });
  }
  
  const backward = () => {
    if (currentPage === 0) {
    } else {
      const value = currentPage - 1;
      setCurrentPage(value);
    }
  };
  
  const forward = () => {
    if (aggregate.length - 1 <= currentPage) {
    } else {
      const value = currentPage + 1;
      setCurrentPage(value);
    }
  };
  
  
  return (
    <div>
      <Pager aggregate={props.contents} backward={backward} forward={forward} />
      { draw() }
    </div>
  );
}
