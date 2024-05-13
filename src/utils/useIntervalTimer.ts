export const useIntervalTimer = ({
  callback,
  interval,
  repeat = Infinity,
}: {
  callback: () => void;
  interval?: number;
  repeat?: number;
}) => {
  let count = 0;

  const intervalTimer = setInterval(() => {
    callback();

    count += 1;
    if (count === repeat) {
      clearInterval(intervalTimer);
    }
  }, interval || 300000); // 5 minutes per requirement

  callback();
};
