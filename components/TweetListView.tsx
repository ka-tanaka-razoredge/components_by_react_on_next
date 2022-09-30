import React, { useState } from 'react';

export default (props) => {
  const [aggregate, setAggregate] = useState(props.aggregate);
  return (
    <div>
    {
      aggregate.map((v) => {
        return (
          <div style={ props.style } dangerouslySetInnerHTML={{ __html: v.value }}></div>
        )
      })
    }
    </div>
  )
}