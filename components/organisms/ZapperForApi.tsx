import React, { useEffect, useState } from 'react';
import Pager from '../../components/atoms/Pager';

export default (props) => {
  const [aggregate, setAggregate]  = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(props.total);

  useEffect(() => {
    (async () => {
      const amount = await props.giveCount();
      setTotal(amount);
      const response = await props.fetchPage(currentPage, 10, currentPage * 10);
      setAggregate(response.data);
    })();
  }, []);
  
  const doIt = (e, record) => {
    props.zap(e, record);
  };
  
  const draw = () => {
    return aggregate.map((v, index) => {
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
          <div className='ChannelButton' onClick={ (e) => { doIt(e, v); } }  dangerouslySetInnerHTML={{ __html: v.name }}></div>
        </div>
      );
    });
  }
  
  const forward = async () => {
//console.log(`total: ${total}, currentPage: ${currentPage}`);
    if (total - 1 < currentPage) {
//console.log('former');
    } else {
//console.log('latter');      
      const value = currentPage + 1;
      const response = await props.fetchPage(value, 10, value * 10);
      setAggregate(response.data);
      setCurrentPage(value);
    }
  };

  const backward = async () => {
//console.log('---- ZapperForApi backword ----');
//console.log(currentPage);
    if (currentPage === 0) {
    } else {
      const value = currentPage - 1;
      const response = await props.fetchPage(value, 10, value * 10);
      setAggregate(response.data);
      setCurrentPage(value);
    }
  };
  
  
  
  return (
    <div>
      <Pager aggregate={aggregate} backward={backward} forward={forward} />
      { draw() }
    </div>
  );
};
