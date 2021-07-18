const reducer = (accumulator, currentValue) => accumulator + currentValue;

export const totalPage = (data) => {
  const getAllTotalPage = data.map((page) => page.total_page);
  return getAllTotalPage.reduce(reducer);
};

export const currentPage = (data) => {
  const getAllCurrentPage = data.map((page) => page.current_page);
  return getAllCurrentPage.reduce(reducer);
};

export const wasRead = (data) => {
  const wasRead = data.map((book) => book.status);
  return wasRead.filter((item) => item == 'Finished').length;
};
