import slugify from 'slugify';
import { NotionRenderer } from 'react-notion';

import Container from '@/components/Container';
import BookCard from '@/components/BookCard';
import { NAME } from '@/utils/constant';
import { formatDate } from '@/utils/format-date';

export default function DetailBook({ book, books, page }) {
  return (
    <Container books={books}>
      <BookCard book={book} />
      <div className="pt-5">
        <div className="mx-auto w-full max-w-2xl">
          <section className="mb-6">
            <h3 className="dark:text-gray-400 text-gray-600 text-sm">
              {NAME} <span className="mx-1">/</span>
              {formatDate(book.date)}
            </h3>
            <hr className="mt-6 w-full border-gray-200 dark:border-gray-700" />
          </section>
          {page && <NotionRenderer blockMap={page} />}
        </div>
      </div>
    </Container>
  );
}

export async function getStaticPaths() {
  const bookRes = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BOOKS}`
  );
  const bookData = await bookRes.json();
  const paths = bookData
    .filter(({ status }) => status === 'Finished')
    .map(({ name }) => `/${slugify(name, { lower: true })}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const bookRes = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BOOKS}`
  );
  const bookData = await bookRes.json();

  if (!bookData) return { notFound: true };

  const { slug } = context.params;
  const book = bookData.find(
    ({ name }) => slugify(name, { lower: true }) === slug
  );

  const pageRes = await fetch(
    `https://notion-api.splitbee.io/v1/page/${book.id}`
  );
  const pageData = await pageRes.json();

  return {
    props: { book, books: bookData, page: pageData },
    revalidate: 1,
  };
}
