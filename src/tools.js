export const getDeltaHours = (timeUp, timeDown) => {
  let days = 0;
  if (Number(timeUp.split(':').join('')) > Number(timeDown.split(':').join(''))) {
    days = 1;
  }
  const dateUp = new Date(`1970/1/1 ${timeUp}`);
  const dateDown = new Date(`1970/1/${1 + days} ${timeDown}`);
  return (dateDown.getTime() - dateUp.getTime()) / 1000 / 60 / 60;
}
