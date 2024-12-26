import React from 'react';
/**
 * { aif(s), pif(s) }は，ややこしい．
 * [綻び, ネコPK, ...]は素直に読み解ける．
 * { pifs: [吹っ飛ぶ], choreographers: [爆発] }は? 
 *   { choreographer: 爆発現象,  }
 *   passive@pif(s)の主体は? 突っ切ろうとするネコが纏うpif(s)はcapture
 *  爆発現象がchoreographerだとする．至近距離にいる主体は吹っ飛ばされる．吹っ飛ぶと考えるのはやや厳しい．
 * 
 */
export default (props={dance: `dive`, choreographer: `ふかふかの布団`}) => {
  return (
    <div style={{ display: 'flex' }}>
      <dl>
        <dt style={{ width: '20rem' }}>dance(s):</dt>
        <dd style={{ background: 'rgb(250, 250, 250, 1.0)' }} dangerouslySetInnerHTML={{ __html: props.dance }} />
      </dl>
      <dl>
        <dt style={{background: 'rgb(0, 0, 0, 0.25'}}>choreograher(s):</dt>
        <dd dangerouslySetInnerHTML={{ __html: props.choreographer }} />
      </dl>
    </div>
  )
}