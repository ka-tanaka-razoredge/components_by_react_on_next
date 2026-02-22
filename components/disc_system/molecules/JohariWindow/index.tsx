import DiscFor from '@/components/disc_system/DiscFor';
import Dcoml from '@/components/disc_system/Dcoml'

export default (props) => {
console.log('JohariWindow: ', props);
  return (
    <>
      <style>
      {
        `
        `
      }
      </style>
{/*
      <DiscFor
        {
          ...props
        }
        views={{ frontInner: true }}
        height={100}
      >
*/}
        <DiscFor
          {
            ...props
          }
          top={1}
          duration={4}
          views={{ frontInner: true }}
          height={50}
          z={50}
        >
          <Dcoml aggregate={props.firstLeft.dcoml} />
        </DiscFor>
        <DiscFor
          {
            ...props
          }
          views={{ frontInner: true }}
          duration={1}
          left={100}
          height={50}
          z={50}
        >
          <Dcoml aggregate={props.firstRight.dcoml} />
        </DiscFor>
        <DiscFor
          {
            ...props
          }
          top={1}
          views={{ frontInner: true }}
          height={50}
        >
          <Dcoml aggregate={props.secondLeft.dcoml} />
        </DiscFor>
        <DiscFor
          {
            ...props
          }
          duration={1}
          views={{ frontInner: true }}
          left={100}
          height={50}
        >
          <Dcoml aggregate={props.secondRight.dcoml} />
        </DiscFor>
{/*
      </DiscFor>
*/}
    </>
  )
};
