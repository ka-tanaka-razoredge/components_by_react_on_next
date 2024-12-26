import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ZapperEx from './my_note/Zapper';

const Zapper = (props) => {
  if (!props.limit && !props.bo) {
    return (
      <ZapperEx contents={props.contents} zap={props.zap} />
    );
  }

  const [pageNumber, setPageNumber] = useState(1);
  const [aggregate, setAggregate] = useState([]);
  const [limit, setLimit] = useState((props.limit) ? props.limit : 10);
  const router = useRouter();
  const dictionary = {
    'bottles': 'bottle',
    'sailing_ships': 'sailing_ship',
    'soms': 'som',
    'bumps': 'bump',
  };
  const id = dictionary[props.bo];

  useEffect(() => {
    (async() => {
      const response = await axios.get(`https://razor-edge.net/gold/${props.bo}/doListByJson?page=1&limit=${limit}`,
        {
          headers: {
          }
        }
      );
//      console.log('---- useEffect begin ----');
//      console.log(response);
//      console.log('---- useEffect end ----');
      const memento = response.data.map((value) => {
        return (value.Bottle) ? value.Bottle : value;
      });
      setAggregate(memento);
    })();
  }, []);

  useEffect(() => {
    if (!props.bo || !router.query.page) return;
    (async() => {
      setPageNumber(parseInt(router.query.page as string));
      const response = await axios.get(`https://razor-edge.net/gold/${props.bo}/doListByJson?page=${router.query.page}&limit=${limit}`,
        {
          headers: {
          }
        }
      );
      const memento = response.data.map((value) => {
        return (value.Bottle) ? value.Bottle : value;
      });
      setAggregate(memento);
    })();
  }, [router.query.page]);
  
  const reloadAggregate = (pageNumber) => {
    (async() => {
      const response = await axios.get(`https://razor-edge.net/gold/${props.bo}/doListByJson?page=${pageNumber}&limit=${limit}`,
        {
          headers: {
          }
        }
      );
      console.log('---- useEffect begin ----');
      console.log(response);
      console.log('---- useEffect end ----');
//      if (response.data.length >= 1) {
      const memento = response.data.map((value) => {
        return (value.Bottle) ? value.Bottle : value;
      });
      setAggregate(memento);
//      }
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
        <div style={{width: `${(props.width) ? props.width : 250}px`, height: '450px', overflow: 'scroll'}}>
          <div style={{display: 'flex'}}>
            <div style={{ border: '1px solid silver' }} onClick={ (e) => { goToPrevious(e); } }>＜</div><div>page m/n</div><div style={{ border: '1px solid silver' }} onClick={ (e) => { goToNext(e); } }>＞</div>
          </div>
          {
            aggregate.map((v) => {
              return (<div style={{ border: '1px solid black' }} onClick={(e) => { props.zap(e, v); }} dangerouslySetInnerHTML={{ __html: v[`${id}_id`] + ' ' + v.name }}></div>)
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Zapper;
