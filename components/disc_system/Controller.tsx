// @ts-nocheck

import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import axios from 'axios';

/**
 *
 * 
 * 
 */
export default forwardRef((props, ref) => {
  const [json, setJson] = useState(`[
  {
    "type": "Sail",
    "identifier": "id-",
    "top": 0,
    "left": 0,
    "contentsForFrontInner": "subject"
  }
]
  `);
  const [id, setId] = useState(-1);
  const [name, setName] = useState('');
  const [resource, setResource] = useState('SailingShip');
  const textarea = useRef(null);
  useImperativeHandle(ref, () => ({
    fetch: () => {
      setJson(JSON.stringify(props.getDiscs()));
    }
  }));

  const apply = () => {
    try {
      JSON.parse(textarea.current.value);
    } catch {
      alert('JSON is invalid!');
      return;
    }
    props.applyDiscs({ value: textarea.current.value });
  }

  const fetch = () => {
    console.log(props.getDiscs());
    setJson(JSON.stringify(props.getDiscs(), null, 2));
  };
  
  const stringify = () => {
    textarea.current.value = JSON.stringify(eval(textarea.current.value));
  };
  
  const fetchFromServer = async () => {
    const response = await axios.get(`${props.api}sailing_ships/findById?id=${ id }`);
    setJson(JSON.stringify(response.data[0].json, null, 2));
    setName(response.data[0].name);
    setResource(response.data[0].resource);
    apply();
  };

  const save = async () => {
    let params = new URLSearchParams();
    params.append('resource', resource);
    params.append('id', id);
    params.append('name', name);
    params.append('json', json);
//    params.append('json', encodeURIComponent(json));
    
    try {
      JSON.parse(json);      
    } catch {
      alert('JSON is invalid!');
      return;
    }
    
    if (id !== -1) {
      if (!window.confirm('Do you want to update?')) return;
    }

    const response = await axios.post(`${props.api}sailing_ships/save`, params);
    alert(JSON.stringify(response));
  };

  function onTabKey( e, obj ){
    obj = textarea.current;
  
  	// タブキーが押された時以外は即リターン
  	if( e.keyCode!=9 ){ return; }
  
  	// タブキーを押したときのデフォルトの挙動を止める
  	e.preventDefault();
  
  	// 現在のカーソルの位置と、カーソルの左右の文字列を取得しておく
  	var cursorPosition = obj.selectionStart;
  	var cursorLeft     = obj.value.substr( 0, cursorPosition );
  	var cursorRight    = obj.value.substr( cursorPosition, obj.value.length );
  
  	// テキストエリアの中身を、
  	// 「取得しておいたカーソルの左側」+「タブ」+「取得しておいたカーソルの右側」
  	// という状態にする。
  	obj.value = cursorLeft+"\t"+cursorRight;
  
  	// カーソルの位置を入力したタブの後ろにする
  	obj.selectionEnd = cursorPosition+1;
  };
  
  const setData = async () => {
    await global.navigator.clipboard.writeText(` {
    "type": "Disc",
    "top": 0,
    "left": 0,
    "isBottomOnly": true,
    "contentsForBottomInner": "dummy"
  }
`
    );
  };


  return (
    <div>
      <style>
      </style>
      <div className={props.classes} style={{ display: 'flex' }} >
        <div>
          JSON:<br />
          <textarea ref={ textarea } cols='1000' rows='1000' style={{ lineHeight: '1.25', width: '500px', height: '775px', tabSize: '2', fontSize: '10pt' }} onChange={ (e) => { setJson(e.target.value);  } } onKeyDown={ (e) => { onTabKey(e); } } value={ json } onBlur={(e) => { apply(); }}></textarea><br />
        </div>          
        <div>
          <input type='button' value='apply' onClick={ (e) => { apply(); } } />
          <input type='button' value='fetch' onClick={ (e) => { fetch(); } } />
          <input type='button' value='stringify' onClick={ (e) => { stringify(); } } /><br />
          <div>
            <div style={{ width: '5rem' }}>id:&nbsp;</div><input type='text' onChange={ (e) => { setId(e.target.value); } } value={ id } />
          </div>
          <div>
            <div style={{ width: '5rem' }}>name:&nbsp;</div><input type='text' onChange={ (e) => { setName(e.target.value); } } value={ name } />
          </div>
          <div>
            <div style={{ width: '5rem' }}>resource:&nbsp;</div><input type='text' onChange={ (e) => { setResource(e.target.value); } } value={ resource } /><br />
          </div>
          <input type='button' value='load' onClick={ (e) => { fetchFromServer(); } } />
          <input type='button' value='save' onClick={ (e) => { save(); } } />
          <br />
          <br />
          <br />
          <input type='button' value='isBottomOnly' onClick={setData} />
        </div>
      </div>
    </div>
  )
})