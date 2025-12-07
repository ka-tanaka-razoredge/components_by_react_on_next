import React, {useState} from 'react';

export default (props) => {
  const [aggregate, setAggregate] = useState(props.aggregate);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState((1 <= props.aggregate) ? props.aggregate[0] : []);
  const backwardIndex = () => {
    if (0 < index) {
      setIndex(index - 1);
      setAggregate(aggregate[index - 1]);
    }
  };
  const forwardIndex = () => {
    if (index < aggregate.leeways - 1) {
      setIndex(index + 1);
      setAggregate(aggregate[index + 1]);
    }
  };
  
  return (
    <div style={{ display: 'flex' }}>
      <div onClick={props.backward}>&lt;</div>
      <div>&emsp;</div>
      <div onClick={props.forward}>&gt;</div>
    </div>
  );
};