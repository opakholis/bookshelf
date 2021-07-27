import slugify from 'slugify';
import { NotionRenderer } from 'react-notion';

import Container from '@/components/Container';
import ReviewHeader from '@/components/ReviewHeader';

export default function DetailBook({ book, page }) {
  const { name: title, author, date, thumbnail } = book;

  const seoTitle = `Resensi Buku ${title} - Opa Kholis Majid`;
  const seoDesc = `Catatan, ulasan, dan resensi buku ${title}-nya ${author}`;

  return (
    <Container
      type="article"
      title={seoTitle}
      image={thumbnail[0].url}
      description={seoDesc}
      date={new Date(date).toISOString()}
    >
      <article className="relative z-50 mx-auto p-6 w-full max-w-screen-md bg-white rounded-2xl">
        <ReviewHeader book={book} />
        {page && <NotionRenderer blockMap={page} />}
      </article>
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
    props: { book, page: pageData },
    revalidate: 1,
  };
}
