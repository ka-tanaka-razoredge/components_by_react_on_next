import React, { useState } from 'react';

export default (props) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginLeft: props.indent }}></div>
      <div dangerouslySetInnerHTML={{ __html: props.body }}></div>
    </div>
  );
};