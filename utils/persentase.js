export default function Persentase({ book, className }) {
  const value1 = book?.current_page;
  const value2 = book?.total_page;

  const result = (value1 / value2) * 100;
  const finalResult = result.toFixed(0);

  return <span className={className}>{finalResult}%</span>;
}
