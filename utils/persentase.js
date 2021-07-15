export default function Persentase({ book }) {
  const getValue = (currentPage, totalPage) => (currentPage / totalPage) * 100;

  return getValue(book?.current_page, book?.total_page).toFixed(0) + '%';
}
