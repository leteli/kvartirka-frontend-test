const formatDate = (date) => new Date(date)
.toLocaleString('ru', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).split(' ').slice(0, -1).join(' ');

export const formatDateTime = (date) => new Date(date).toLocaleString('ru');

export const getDaysForUrl = () => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const msPerDay = 1000 * 60 * 60 * 24;
  const tomorrow = new Date(timeElapsed + msPerDay);
  return {
    today: today.toISOString().split('T')[0],
    tomorrow: tomorrow.toISOString().split('T')[0],
  };
};

export default formatDate;
