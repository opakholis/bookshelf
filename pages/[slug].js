import Image from 'next/image';
import { NotionRenderer } from 'react-notion';

import Container from '@/components/Container';
import ReviewHeader from '@/components/ReviewHeader';

import { NAME } from '@/utils/constant';
import { formatDate } from '@/utils/format-date';
import { getBooksTable, getPageBlocks, slugByName } from '@/config/notion';

export default function DetailBook({ book, page }) {
  const { name: title, author, date, thumbnail } = book;

  const seoTitle = `Resensi Buku ${title}: ${author}`;
  const seoDesc = `Catatan dan ulasan dari buku ${title} oleh ${author}`;

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
            <Image
              src="/static/images/me.png"
              width={35}
              height={35}
              alt={NAME}
              priority
            />
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
  const booksTable = await getBooksTable();

  return {
    paths: booksTable
      .filter(({ status }) => status === 'Finished')
      .map(({ name }) => `/${slugByName(name)}`),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const booksTable = await getBooksTable();

  const book = booksTable.find(({ name }) => slugByName(name) === slug);

  const page = await getPageBlocks(book.id);

  return {
    props: { book, page },
    revalidate: 10,
  };
}
