export default function Persentase({ book }) {
  const getValue = (currentPage, totalPage) => {
    return (currentPage / totalPage) * 100;
  };

  return getValue(book?.current_page, book?.total_page).toFixed(0) + '%';
}
