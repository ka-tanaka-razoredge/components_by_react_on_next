import React, { useState } from 'react';

export default (props) => {
    
    const [currentUri, setCurrentUri] = useState('');
    
    const [list, setList] = useState(props.list);
    
    const draw = (value) => {
        if (value.uri !== currentUri) {
            
            if ('transform' in value === false) {
                return (<div>
                    <div className='ChannelButton'>
                        <div style={{ width: '10px' }}></div><div title={ value.title } onClick={() => { window.open(value.uri); setCurrentUri(value.uri); } }>{ value.name }</div>
                    </div>
                </div>)
            } else {
                return (<div>
                    <div className='ChannelButton' style={{ position: 'absolute', top: value.top, left: value.left, transform: value.transform }}>
                        <div style={{ width: '10px' }}></div><div title={ value.title } onClick={() => { window.open(value.uri); setCurrentUri(value.uri); } }>{ value.name }</div>
                    </div>
                </div>)
            }
        } else {
            if ('transform' in value === false) {
                return (<div>
                    <div style={{display: 'flex', color: 'rgba(250, 250, 250, 1.0)', background: 'blue'}}>
                        <div style={{ width: '10px' }}></div><div title={ value.title } onClick={() => { window.open(value.uri); setCurrentUri(value.uri); } }>{ value.name }</div>
                    </div>
                </div>)
            } else {
                return (<div>
                    <div style={{display: 'flex', color: 'rgba(250, 250, 250, 1.0)', background: 'blue', position: 'absolute', top: value.top, left: value.left, transform: value.transform}}>
                        <div style={{ width: '10px' }}></div><div title={ value.title } onClick={() => { window.open(value.uri); setCurrentUri(value.uri); } }>{ value.name }</div>
                    </div>
                </div>)
            }
        }
    }
    
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div>
                    {
                        list.map((value) => {
                            return draw(value);
                        })
                    }
                </div>
            </div>
        </div>
    )
}