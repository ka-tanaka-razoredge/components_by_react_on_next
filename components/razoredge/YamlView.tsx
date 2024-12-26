import React from 'react';

export default (props) => {
  const aggregate = props.yamlable;
  return (
    <div>
    {
      aggregate.map((v) => {
        return (
          <div style={{ color: '' }}>
          </div>
        )
      })
    }
    </div>
  )
}