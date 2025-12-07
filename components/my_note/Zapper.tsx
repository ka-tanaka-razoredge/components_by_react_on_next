// @ts-nocheck

import React, { useEffect, useState } from 'react';
import Dac from '../Dac';
import Ofar from '@/components/disc_system/atoms/Ofar';
import Cluster from '../Cluster';

/**
 * props: { zap, aggregate, uriPrefix }
 */
export default (props) => {
  const [aggregate, setAggregate]  = useState(props.contents);
  const [currentPage, setCurrentPage] = useState(0);
  const [uriPrefix] = useState(props.uriPrefix || '');

  const doIt = (e, record) => {
//    window.open(record.uri);
    props.zap(e, `${uriPrefix}${record.body}`);
  };
  
  const draw = () => {
    return aggregate[currentPage].map((v, index) => {
      const drawIndent = () => {
        if (v.indent) {
          return (<div style={{ width: v.indent }}></div>);
        } else if (v.parent) {
          return (<div style={{ width: '2rem' }}></div>);
        } else {
          return null;
        }
      };
      
      if ('component' in v && props.component !== '(Idl)') {
          return (
            <div key={index} style={{ display: 'flex' }}>
              { drawIndent(v) }
              <div className='ChannelButton' onClick={ (e) => { props.zap(e, v); } }  dangerouslySetInnerHTML={{ __html: v.value }}></div>
            </div>
          );
      }

      if ('component' in props === false) {
        return (
          <div style={{ display: 'flex' }}>
            {/* <!-- TODO: '.'の数で先祖を遡る --> */}
            { drawIndent(v) }
            <div className='ChannelButton' onClick={ (e) => { doIt(e, v); } }  dangerouslySetInnerHTML={{ __html: v.value }}></div>
          </div>
        );
      } else {
        if (props.component === 'Dac') {
          return (
            <div style={{ display: 'flex' }}>
              {/* <!-- TODO: '.'の数で先祖を遡る --> */}
              { drawIndent(v) }
              <Dac onClick={ (e) => { props.zap(e, v.body); } } dance={ v.dance } choreographer={ v.choreographer } ></Dac>
            </div>
          );
        } else if (props.component === 'Ofar') {
          return (
            <div style={{ display: 'flex' }}>
              {/* <!-- TODO: '.'の数で先祖を遡る --> */}
              { drawIndent(v) }
              <Ofar onClick={(e) => { props.zap(e, v.body); }} name={v.name} sail={v.sail} lw={v.lw} rw={v.rw} rig={v.rig} />
            </div>
          );
        } else if (props.component === '(Idl)' ) {
          if (v.component === 'Cluster') {
              return (
                <div style={{ display: 'flex' }}>
                  {/* <!-- TODO: '.'の数で先祖を遡る --> */}
                  { drawIndent(v) }
                  <Cluster onClick={(e) => { props.zap(e, v.body); }} name={v.name} candy={v.subject} children={v.blades} />
                </div>
              );
          } else {
            return (
              <div key={index} style={{ display: 'flex' }}>
                { drawIndent(v) }
                <div className='ChannelButton' onClick={ (e) => { props.zap(e, v); } }  dangerouslySetInnerHTML={{ __html: v.value }}></div>
              </div>
            );
          }
        }
      }
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
console.log(aggregate);
    if (aggregate.length - 1 <= currentPage) {
    } else {
      const value = currentPage + 1;
      setCurrentPage(value);
    }
  };
  
  
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div onClick={ (e) => { backward(); } }>&lt;</div>
        <div style={{ width: '1rem' }}></div>
        <div onClick={ (e) => { forward(); } }>&gt;</div>
      </div>
      { draw() }
    </div>
  );
}
