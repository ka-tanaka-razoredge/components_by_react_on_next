import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import axios from 'axios';

/**
 *
 * 
 * 
 */
export default forwardRef((props, ref) => {
  const [json, setJson] = useState('');
  const [id, setId] = useState(-1);
  const [name, setName] = useState('');
  const textarea = useRef(null);
  useImperativeHandle(ref, () => ({
    fetch: () => {
      setJson(JSON.stringify(props.getDiscs()));
    }
  }));

  const apply = () => {
    props.applyDiscs({ value: textarea.current.value });
  }

  const fetch = () => {
    console.log(props.getDiscs());
    setJson(JSON.stringify(props.getDiscs(), null, 2));
  };
  
  const fetchFromServer = async () => {
    const response = await axios.get(`https://razor-edge.net/cakephp-2.4.4/sailing_ships/findById?id=${ id }`);
    setJson(JSON.stringify(response.data[0].json, null, 2));
    setName(response.data[0].name);
    apply();
  };

  const save = async () => {
    let params = new URLSearchParams();
    params.append('id', id);
    params.append('name', name);
    params.append('json', json);
//    params.append('json', encodeURIComponent(json));
    await axios.post(`https://razor-edge.net/cakephp-2.4.4/sailing_ships/save`, params);
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
  }  
  
  return (
    <div>
      <style>
      </style>
      <div className={ props.classes }>
        JSON:<br />
        <textarea ref={ textarea } cols='1000' rows='1000' style={{ width: '1000px', height: '250px', tabSize: '2' }} onChange={ (e) => { setJson(e.target.value);  } } onKeyDown={ (e) => { onTabKey(e); } } value={ json }></textarea><br />
        <input type='button' value='apply' onClick={ (e) => { apply(); } } />
        <input type='button' value='fetch' onClick={ (e) => { fetch(); } } /><br />
        id:&nbsp;<input type='text' onChange={ (e) => { setId(e.target.value); } } value={ id } />
        name:&nbsp;<input type='text' onChange={ (e) => { setName(e.target.value); } } value={ name } /><br />
        <input type='button' value='load' onClick={ (e) => { fetchFromServer(); } } />
        <input type='button' value='save' onClick={ (e) => { save(); } } />
      </div>
    </div>
  )
})