export const formatDate = (date) =>
  new Date(date).toLocaleString('id', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
