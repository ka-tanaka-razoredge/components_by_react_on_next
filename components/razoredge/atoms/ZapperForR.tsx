/**
 * https://razor-edge.net/gold/razor_edge/(idls|leeways|gull_and_games|bumps(file))
 */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default (props) => {
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
    console.log(pageNumber);
/*    
    (async() => {
      const response = await axios.get(`https://razor-edge.net/gold/${props.bo}/doListByJson?page=${pageNumber}&limit=${limit}&resource=${props.resource}`,
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
*/    
  }, []);

  useEffect(() => {
    if (!props.bo || !router.query.page) return;
    (async() => {
      
      setPageNumber(parseInt(router.query.page as string));
      const response = await axios.get(`https://razor-edge.net/gold/${router.query.controller}/doListByJson?page=${router.query.page}&limit=${router.query.limit||limit}&resource=${router.query.resource}&dest=${router.query.dest||'file'}`,
        {
          headers: {
          }
        }
      );

      const memento = response.data.map((value) => {
        return value;
      });

      setAggregate(memento);
    })();
    
  }, [router.query.page, router.query.resource, router.query.controller]);
  
  const goToNext = (e) => {
    const next = pageNumber + 1;
    router.push({
      query: { ...router.query, page: next },
    });
  };

  const goToPrevious = (e) => {
    if (pageNumber <= 1) return;
    const prev = pageNumber - 1;
    router.push({
      query: { ...router.query, page: prev },
    });
  };
  
  const drawIdl = (value) => {
    return (
      <>
        <div style={{ display: 'flex' }}>
        {
          value.data.map((v) => {
            if (v) {
              return (<div style={{ border: '1px solid silver', margin: '2px 4px' }}>{v}</div>);
            }
          })
        }
        </div>
      </>
    );
  };

  return (
    <div>
      <div style={{}}>
      
        <div style={{}}>
        
          <div style={{ display: 'flex', position: 'sticky' }}>
            <div style={{ border: '1px solid silver' }} onClick={ (e) => { goToPrevious(e); } }>＜</div><div>{`page ${pageNumber}/n`}</div><div style={{ border: '1px solid silver' }} onClick={ (e) => { goToNext(e); } }>＞</div>
          </div>
    
          <div>
          {
            aggregate.map((v) => {
              return (
                <>
                {
                  (props.bo !== 'bumps') ? (<div style={{ border: '1px solid black', margin: '2px 4px' }} onClick={(e) => {}}>
                    {v.id}&emsp;{v.category}
                    {drawIdl(v)}
                  </div>) : (
                    <div style={{ display: 'flex', gap: `${0.25}rem` }} onClick={(e) => { props.zap(e, v); }}>
                      <div>{v.bump_id}</div><div dangerouslySetInnerHTML = {{ __html: v.name }} />
                    </div>
                  )
                }
                </>
              )
            })
          }
          </div>

        </div>
        
      </div>
    </div>
  )
}