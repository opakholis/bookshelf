export const persentase = (book) => {
  const getValue = (current, total) => (current / total) * 100;

  return getValue(book?.current_page, book?.total_page).toFixed(0) + '%';
};
