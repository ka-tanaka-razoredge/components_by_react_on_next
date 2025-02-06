/**
 *
 * 
 * counterがdurationに到ったらcallBackをcall
 */
import { useEffect, useState } from 'react';

const useLongTap = (lop: { [key: string]: any }) => {
  // stateにするとclearIntervalでfail
  let timerForPress = useState(null);
  const [counterForPress, setCounterForPress] = useState(0);
  let counterForPressRaw = 0;

  const executeLongTap = () => {
    lop.refs.client.current.addEventListener('mousedown', (e) => {
      if (!timerForPress) {
        timerForPress = setInterval(() => { setCounterForPress(counterForPressRaw += 10); }, 10);
      }
    });

    lop.refs.client.current.addEventListener('mouseup', (e) => {
      clearInterval(timerForPress);
      timerForPress = null;
      counterForPressRaw = 0;
      setCounterForPress(0);
    });
  };

  useEffect(() => {
    if (lop.duration <= counterForPress) {
      lop.callBack();
      clearInterval(timerForPress);
      timerForPress = null;
    }
  }, [counterForPress]);

  return {
    executeLongTap,
  };
};

export default useLongTap;
