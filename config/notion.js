import slugify from 'slugify';

const books = process.env.NOTION_BOOKS;
const bookmarks = process.env.NOTION_BOOKMARKS;

export const getBooksTable = async () =>
  fetch(`https://notion-api.splitbee.io/v1/table/${books}`).then((res) =>
    res.json()
  );

export const getBookmarksTable = async () =>
  fetch(`https://notion-api.splitbee.io/v1/table/${bookmarks}`).then((res) =>
    res.json()
  );

export const getPageBlocks = async (pageId) =>
  fetch(`https://notion-api.splitbee.io/v1/page/${pageId}`).then((res) =>
    res.json()
  );

export const slugByName = (bookName) => slugify(bookName, { lower: true });
