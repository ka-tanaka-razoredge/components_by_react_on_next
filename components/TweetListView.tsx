import React, { useState } from 'react';

export default (props) => {
  const [aggregate, setAggregate] = useState(props.aggregate);
  return (
    <div style={ props.style }>
    {
      aggregate.map((v) => {
        return (
          <div dangerouslySetInnerHTML={{ __html: v.value }}></div>
        )
      })
    }
    </div>
  )
}