const formatDate = (date) => new Date(date)
.toLocaleString('ru', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).split(' ').slice(0, -1).join(' ');

export const formatDateTime = (date) => new Date(date).toLocaleString('ru');

export default formatDate;
