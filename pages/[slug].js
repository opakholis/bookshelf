import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'phosphor-react';
import { NotionRenderer } from 'react-notion';

import BookCard from '@/components/BookCard';
import Container from '@/components/Container';
import ReviewHeader from '@/components/ReviewHeader';
import Subscribe from '@/components/Subscribe';

import { NAME } from '@/utils/constant';
import { formatDate } from '@/utils/format-date';
import { getBooksTable, getPageBlocks, slugByName } from '@/config/notion';

export default function DetailBook({ book, page, moreBooks }) {
  const { name: title, author, date, thumbnail } = book;

  const seoTitle = `Resensi Buku ${title} Karya ${author}`;
  const seoDesc = `Catatan dan ulasan dari buku ${title} karya ${author}`;

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
                className="fancy-link focus:outline-black"
              >
                {NAME}
              </a>
              <span className="mx-1">/</span>
              {formatDate(book.date)}
            </h3>
          </section>
          <NotionRenderer blockMap={page} />

          <section className="mb-4 mt-24">
            <Subscribe />
          </section>

          <section className="my-4">
            <p className="text-gray-600 text-sm">
              Tulisan ini diperbarui pada tanggal:
              <span className="ml-1 font-medium">
                {formatDate(book?.last_updated)}
              </span>
            </p>
          </section>

          <section className="mb-16 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-[14.5px] text-gray-500 font-semibold uppercase">
                Lanjutkan Membaca
              </h3>
              <Link href="/all">
                <a className="fancy-link inline-flex items-center">
                  Koleksi{' '}
                  <ArrowRight size={14} weight="bold" className="ml-0.5" />
                </a>
              </Link>
            </div>
            <div className="grid gap-5 grid-cols-1 pt-4 sm:grid-cols-2">
              {moreBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
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
      .filter(({ status }) => status == 'Finished')
      .map(({ name }) => `/${slugByName(name)}`),
    fallback: false
  };
}

export async function getStaticProps({ params: { slug } }) {
  const booksTable = await getBooksTable();

  const finished = booksTable
    .filter(({ status }) => status == 'Finished')
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  const book = booksTable.find(({ name }) => slugByName(name) === slug);
  const bookIndex = finished.findIndex(({ name }) => slugByName(name) === slug);

  const moreBooks = [...finished, ...finished].slice(
    bookIndex + 1,
    bookIndex + 3
  );

  const page = await getPageBlocks(book.id);

  return {
    props: { book, page, moreBooks, bookIndex, finished },
    revalidate: 10
  };
}
