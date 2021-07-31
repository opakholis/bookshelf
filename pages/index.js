import Link from 'next/link';
import Image from 'next/image';

import Container from '@/components/Container';
import Read from '@/components/Read';
import Bookmarks from '@/components/Bookmarks';

import { NAME } from '@/utils/constant';
import { persentase } from '@/utils/persentase';
import { getBooksTable, getBookmarksTable } from '@/config/notion';

export default function Home({ books, reading, finished, bookmarks }) {
  const seeMore = finished.length - 3;

  return (
    <Container>
      <div className="h-[420px] absolute -top-24 w-full bg-groovy-blue" />
      <main className="relative z-50 mx-auto p-6 w-full max-w-screen-sm bg-white rounded-xl md:mt-20 md:max-w-screen-md">
        <div className="space-y-3">
          <Image
            src="/static/images/me.png"
            width={100}
            height={100}
            alt={NAME}
            priority
          />
          <h1 className="text-gray-900 text-2xl font-bold">{NAME}</h1>
          <h2 className="text-gray-500">
            {books.length} Buku
            <span className="mx-1">&bull;</span>
            {reading.length} Sedang Dibaca
          </h2>
          <section className="flex flex-wrap gap-2 pt-6 w-full lg:w-3/4">
            {reading.map((book) => (
              <div
                key={book.id}
                className="px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 border border-gray-100 rounded-full"
              >
                {persentase(book)}
                <span className="mx-0.5 text-gray-500">&bull;</span>
                {book.name}
              </div>
            ))}
          </section>

          <section className="py-6 space-y-1">
            <h1 className="text-2xl font-bold">Buku</h1>
            <h2 className="text-gray-600">Selesai Dibaca</h2>
            <div className="grid gap-5 grid-cols-1 pt-6 md:grid-cols-3">
              {finished.slice(0, 3).map((book) => (
                <Read book={book} key={book.id} featured />
              ))}
            </div>
            <div className="grid gap-5 pt-4 md:grid-cols-4">
              {finished.slice(4, 7).map((book) => (
                <Read book={book} key={book.id} className="hidden md:block" />
              ))}
              <section className="h-[7.7rem] flex flex-col items-center justify-center p-3 rounded-lg">
                <h2 className="text-md font-semibold md:hidden">
                  <strong className="link-custom">+{seeMore}</strong> buku
                  tersembunyi
                </h2>
                <h3 className="mb-2 py-1 text-center text-gray-500 text-base md:text-gray-800 md:text-sm">
                  Ingin menampilkan lebih banyak?
                </h3>
                <Link href="/all">
                  <a className="bg-groovy-purple/10 hover:bg-groovy-purple/20 focus:ring-groovy-violet/40 px-10 py-3 text-groovy-violet text-base font-medium rounded-md focus:outline-none transition duration-300 focus:ring md:px-4 md:py-1.5 md:text-sm">
                    Lihat Semua
                  </a>
                </Link>
              </section>
            </div>
          </section>

          <section className="py-6 space-y-1">
            <h1 className="mt-2 text-2xl font-bold">Bookmarks</h1>
            <h2 className="text-gray-600">Yang cukup menarik untuk dibaca</h2>
            <div className="pt-6">
              {bookmarks.map((x) => (
                <Bookmarks data={x} key={x.id} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </Container>
  );
}

export async function getStaticProps() {
  const booksTable = await getBooksTable();
  const bookmarksTable = await getBookmarksTable();

  const finished = booksTable
    .filter(({ status }) => status == 'Finished')
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
  const reading = booksTable
    .filter(({ status }) => status == 'Reading')
    .sort(
      (a, b) =>
        Number(new Date(b.last_updated)) - Number(new Date(a.last_updated))
    );
  const bookmarks = bookmarksTable
    .filter(({ published }) => published)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return {
    props: {
      books: booksTable,
      finished,
      reading,
      bookmarks,
    },
    revalidate: 10,
  };
}
