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
    await axios.get(`https://razor-edge.net/cakephp-2.4.4/sailing_ships/save?id=${ id }&name=${ name }&json=${ encodeURIComponent(json) }`);
  };
  
  
  return (
    <div>
      <div>
        JSON:<br />
        <textarea ref={ textarea } cols='1000' rows='1000' style={{ width: '1000px', height: '250px' }} onChange={ (e) => { setJson(e.target.value);  } } value={ json }></textarea><br />
        <input type='button' value='apply' onClick={ (e) => { apply(); } } />
        <input type='button' value='fetch' onClick={ (e) => { fetch(); } } /><br />
        id:&nbsp;<input type='text' onChange={ (e) => { setId(parseInt(e.target.value)); } } value={ id } />
        name:&nbsp;<input type='text' onChange={ (e) => { setName(e.target.value); } } value={ name } /><br />
        <input type='button' value='load' onClick={ (e) => { fetchFromServer(); } } />
        <input type='button' value='save' onClick={ (e) => { save(); } } />
      </div>
    </div>
  )
})