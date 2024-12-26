import React, { useState } from 'react';
import Tag from './Tag';

export default (props) => {
  const [aggregate, setAggregate] = useState(props.aggregate);

  return (
    <div style={{ display: 'flex' }}>
    {
      props.aggregate.map((v) => {
        return (
          <Tag value={ v.value } />
        )
      })
    }
    </div>
  )
}