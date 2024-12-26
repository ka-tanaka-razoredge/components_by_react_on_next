import React from 'react';

export default (props) => {
  return (
    <div style={{ margin: '1px 1px', padding: '1px 1px 1px 1px', color: 'white', backgroundColor: 'pink' }}>
      { props.value }
    </div>
  )
}