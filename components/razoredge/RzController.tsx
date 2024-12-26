// @ts-nocheck

import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import axios from 'axios';
import DiscPanel from './disc_system/molecules/RzController/DiscPanel';

/**
 * 
 * 
 * 
 */
export default forwardRef((props: { api, applyDiscs, json, resource, rotate }, ref) => {
  const [json, setJson] = useState(props.json);
//  const [json, setJson] = useState((props.json) ? props.json : '');
  const [id, setId] = useState(-1);
  const [name, setName] = useState('');
  const [resource, setResource] = useState(props.resource);
  const textarea = useRef(null);
  const discPanel = useRef();
  
  useImperativeHandle(ref, () => ({
    fetch: () => {
      setJson(JSON.stringify(props.getDiscs()));
    },
    setJson: (value) => {
      setJson(value);
    },
    setId: (value) => {
      setId(value);
    },
    setName: (value) => {
      setName(value);
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
  
  const fetchFromServer = async (resource) => {
    const response = await axios.get((resource) ? `${props.api}/${resource}/findById?id=${ id }` : `${props.api}/sailing_ships/findById?id=${ id }`);
    if (resource === 'bottles') {
      setJson(response.data[0].body);
      setResource(resource);
    } else {
      setJson(JSON.stringify(response.data[0].json, null, 2));
      setResource(response.data[0].resource);
    }
    setName(response.data[0].name);
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
      if (json.length >= 1) JSON.parse(json);      
    } catch {
      alert('JSON is invalid!');
      return;
    }
    
    if (id !== -1) {
      if (!window.confirm('Do you want to update?')) return;
    }
    
    const dictionary = {
      'Matrix': 'matrices',
    };
    let r = resource;
    if (dictionary[resource]) r = dictionary[resource];
    
    const response = await axios.post(`${props.api}/${r}/save`, params);
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
  }

  const setData = async (lop={value: 'isBottomOnly'}) => {
    let value = '';
    switch (lop.value) {
      case 'Disc':
        value = `  {
    "type": "Disc",
    "identifier": "id-",
    "top": 0,
    "left": 0,
    "contentsForFrontInner": "dummy"
  }
`;
        break;
      case 'isPastOrFuture':
        value = ` {
    "type": "PastOrFuture",
    "identifier": "id-",
    "top": 0,
    "left": 0,
    "height": 100,
    "width": 100,
    "isBottomOnly": true,
    "isPast": false,
    "contentsForBottomInner": "conjecture",
    "discs": [
      [
        {
          "type": "Disc",
          "top": 90,
          "left": 0,
          "isBottomOnly": true,
          "contentsForBottomInner": "rw"
        }
      ]
    ]
  }
`;
        break;
      case 'nowrap':
        value = `<span style='white-space: nowrap;'>`;
        break;
      case 'wideSail':
        value = `  {
    "type": "Sail",
    "identifier": "id-",
    "duration": 200,
    "top": 0,
    "left": 0,
    "width": 400,
    "height": 100,
    "contentsForFrontInner": "ooBottle"
  },
  {
    "type": "Sail",
    "identifier": "id-",
    "top": 0,
    "left": 0,
    "contentsForFrontInner": "capsule-1"
  },
  {
    "type": "Disc",
    "identifier": "id-",
    "top": 0,
    "left": 0,
    "contentsForFrontInner": "capsule-1"
  },
  {
    "type": "Sail",
    "identifier": "id-",
    "top": 0,
    "left": 100,
    "contentsForFrontInner": "capsule-2"
  },
  {
    "type": "Disc",
    "identifier": "id-",
    "top": 0,
    "left": 100,
    "contentsForFrontInner": "capsule-1"
  },
  {
    "type": "Sail",
    "identifier": "id-",
    "top": 0,
    "left": 200,
    "contentsForFrontInner": "capsule-3"
  },
  {
    "type": "Disc",
    "identifier": "id-",
    "top": 0,
    "left": 200,
    "contentsForFrontInner": "capsule-1"
  },
  {
    "type": "Sail",
    "identifier": "id-",
    "top": 0,
    "left": 300,
    "contentsForFrontInner": "capsule-4"
  },
  {
    "type": "Disc",
    "identifier": "id-",
    "top": 0,
    "left": 300,
    "contentsForFrontInner": "capsule-1"
  }
`;
        break;
      case 'carousel':
        value = `{"type":"Carousel","identifier":"id-00000100","top":0,"left":0,"height":50,"width":100,"contents":[{"html":"This is HTML"},{"html":"That is HTML"}]}`;
        break;
      case 'sail':
        value = `  {
    "type": "Sail",
    "identifier": "id-",
    "top": 0,
    "left": 0,
    "contentsForFrontInner": "subject"
  },
`;
        break;
      default:
        value = ` {
    "type": "Disc",
    "top": 0,
    "left": 0,
    "isBottomOnly": true,
    "contentsForBottomInner": "dummy"
  }
`;
        break;
    }
    await global.navigator.clipboard.writeText(value);
  };
  
  const onMouseOver = () => {
    document.getElementById('discPanel').dispatchEvent(new CustomEvent('done mouseover', {}));
//    discPanel.current.dispatchEvent(new CustomEvent('done mouseover', {}));    
  };
  
  const rotateTank = () => {
    props.rotate(`rotateZ(180deg)`);
  };

  return (
    <div>
      <style>
      </style>
      <div className={ props.classes }>
        JSON:<br />
        <textarea ref={ textarea } cols='1000' rows='1000' style={{ width: '1000px', height: '250px', tabSize: '2' }} onChange={ (e) => { setJson(e.target.value);  } } onKeyDown={ (e) => { onTabKey(e); } } value={ json } onBlur={(e) => { apply(); }}></textarea><br />
        <input type='button' value='apply' onClick={ (e) => { apply(); } } />
        <input type='button' value='fetch' onClick={ (e) => { fetch(); } } />
        <input type='button' value='stringify' onClick={ (e) => { stringify(); } } /><br />
        id:&nbsp;<input type='text' onChange={ (e) => { setId(e.target.value); } } value={ id } />
        name:&nbsp;<input type='text' onChange={ (e) => { setName(e.target.value); } } value={ name } />
        resource:&nbsp;<input type='text' onChange={ (e) => { setResource(e.target.value); } } value={ resource } /><br />
        <button onClick={rotateTank}>Tank &gt;&gt;= rotate</button><br />
        <br />
        <input type='button' value='load from ' onClick={ (e) => { fetchFromServer(); } } />
        <input type='button' value='load' onClick={ (e) => { fetchFromServer(props.resource); } } />
        <input type='button' value='save' onClick={ (e) => { save(); } } /><br />
        <input type='button' value='Disc' onClick={ (e) => { setData({ value: 'Disc' }) } } />
        <input type='button' value='Disc bottom only' onClick={ (e) => { setData({ value: '' }) } } />
        <input type='button' value='isPastOrFuture' onClick={ (e) => { setData({ value: 'isPastOrFuture' }) } } />
        <input type='button' value='nowrap' onClick={ (e) => { setData({ value: 'nowrap' }) } } />
        <input type='button' value='wide Sail' onClick={ (e) => { setData({ value: 'wideSail' }) } } />
        <input type='button' value='Carousel' onClick={ (e) => { setData({ value: 'carousel' }) } } />
        <input type='button' value='Sail' onClick={ (e) => { setData({ value: 'sail' }) } } />
        <div onMouseOver={onMouseOver} style={{ width: `${2}rem` }}>
          「領域」
          <DiscPanel ref={discPanel} id={`discPanel`} top={100} left={100}  />
        </div>
      </div>
    </div>
  )
})