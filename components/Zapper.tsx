import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [aggregate, setAggregate] = useState([]);

  useEffect(() => {
      (async() => {
          const response = await axios.get(`https://razor-edge.net/cakephp-2.4.4/${props.bo}/doListByJson?page=1`,
              {
                  headers: {
                  }
              }
          );
          console.log('---- useEffect begin ----');
          console.log(response);
          console.log('---- useEffect end ----');
          const memento = response.data.map((value) => {
            return value.Bottle;
          });
          setAggregate(memento);
      })();
  }, []);
  
  const reloadAggregate = (pageNumber) => {
      (async() => {
          const response = await axios.get(`https://razor-edge.net/cakephp-2.4.4/${props.bo}/doListByJson?page=${pageNumber}`,
              {
                  headers: {
                  }
              }
          );
          console.log('---- useEffect begin ----');
          console.log(response);
          console.log('---- useEffect end ----');
//          if (response.data.length >= 1) {
            const memento = response.data.map((value) => {
              return value.Bottle;
            });
            setAggregate(memento);
//          }
      })();
  };
  
  const goToNext = (e) => {
    reloadAggregate(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const goToPrevious = (e) => {
    if (pageNumber == 1) return;
    reloadAggregate(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };

  return (
    <div>
      <div style={{height: '450px', border: '1px solid black', display: 'flex'}}>
        <div style={{width: '250px', height: '450px', overflow: 'scroll'}}>
          <div style={{display: 'flex'}}>
            <div style={{ border: '1px solid silver' }} onClick={ (e) => { goToPrevious(e); } }>＜</div><div>page m/n</div><div style={{ border: '1px solid silver' }} onClick={ (e) => { goToNext(e); } }>＞</div>
          </div>
          {
            aggregate.map((value) => {
              return (<div style={{ border: '1px solid black' }} onClick={(e) => { props.zap(e, './bottles/detail?id=' + value.bottle_id); }}>{ value.bottle_id + ' ' + value.name }</div>)
            })
          }
        </div>
      </div>
    </div>
  )
}