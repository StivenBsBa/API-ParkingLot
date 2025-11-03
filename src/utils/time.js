export const formatTotalTime = (totalTime) => {
  const totalTimeInHours = Math.floor(totalTime || 0);
  return `${totalTimeInHours} ${totalTimeInHours === 1 ? 'hora' : 'horas'}`;
};
