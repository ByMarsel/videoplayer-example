export const formatCurrentVideoTime = (seconds: number) => {
  if (!seconds) {
    return "0:00";
  }

  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);

  const minutesLabel = min >= 1 ? min : 0;
  const secondsLabel = sec < 10 ? `0${sec}` : sec;

  return `${minutesLabel}:${secondsLabel}`;
};
