import Image from 'next/image';
import slugify from 'slugify';
import { NotionRenderer } from 'react-notion';

import Container from '@/components/Container';
import ReviewHeader from '@/components/ReviewHeader';

import { NAME } from '@/utils/constant';
import { formatDate } from '@/utils/format-date';

export default function DetailBook({ book, page }) {
  const { name: title, author, date, thumbnail } = book;

  const seoTitle = `Resensi Buku ${title}: ${author}`;
  const seoDesc = `Catatan, ulasan, dan resensi buku ${title}-nya ${author}`;

  return (
    <Container
      type="article"
      title={seoTitle}
      image={thumbnail[0].url}
      description={seoDesc}
      date={new Date(date).toISOString()}
    >
      <ReviewHeader book={book} />
      {page && (
        <div className="relative mx-auto px-6 max-w-screen-sm">
          <section className="flex items-center mb-3 mt-4 mb:mt-8">
            <Image src="/static/me.png" width={35} height={35} alt={NAME} />
            <h3 className="ml-2 text-gray-600 text-sm">
              <a
                href="https://opakholis.dev/whoami"
                target="_blank"
                rel="noopener noreferrer"
                className="link-custom focus:outline-black"
              >
                {NAME}
              </a>
              <span className="mx-1">/</span>
              {formatDate(book.date)}
            </h3>
          </section>
          <NotionRenderer blockMap={page} />
          <section className="mb-6 mt-12">
            <p className="text-gray-600 text-sm">
              Tulisan ini diperbarui pada tanggal:
              <span className="ml-1 font-medium">
                {formatDate(book?.last_updated)}
              </span>
            </p>
          </section>
        </div>
      )}
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
