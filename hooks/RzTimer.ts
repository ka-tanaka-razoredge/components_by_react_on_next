export const useRzTimer = () => {
  let timer = null;
  let counter = 0;
  const magazine = [];

  const doRoutine = () => {
    if (counter === Number.MAX_SAFE_INTEGER) counter = 0;
    switch (counter) {
      default:
        if (1 <= magazine.length) {
          let simultaneous = magazine.shift();
          simultaneous.map((doIt) => {
            doIt();
          });
        }
        break;
    }
    counter++;
  };
  
  const setIntervalForRzTimer = (rate) => {
    timer = setInterval(doRoutine, rate);
  };

  return {
    doRoutine,
    magazine,
    setIntervalForRzTimer,
  };
};
