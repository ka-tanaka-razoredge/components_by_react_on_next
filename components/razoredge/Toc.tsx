// @ts-nocheck

import React from 'react';

export default (props) => {
    return (
        <div style={{ margin: '1rem 1rem' }}>
            <div style={{ border: '1px solid rgba(0, 0, 0, 1.0)', backgroundColor: 'rgba(0, 0, 0, 0.1)',  }}>
                <font size='1'>Table of contents</font><br />
                {
                    props.contents.map((v) => {
                        // TODO: 10pxをv.xyzによって差し替える
                        return (
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '10px' }}></div>
                                <div>{ v.value }</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}