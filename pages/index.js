import Image from 'next/image';

import Container from '@/components/Container';
import Read from '@/components/Read';

import { NAME } from '@/utils/constant';
import Link from 'next/link';

export default function Home({ books, reading, finished, bookmarks }) {
  console.log(`bookmarks`, bookmarks);
  return (
    <Container>
      <div className="h-[420px] absolute -top-24 w-full bg-groovy-red" />
      <section className="relative z-50 mt-4 mx-auto p-6 w-full max-w-screen-md bg-white rounded-lg md:mt-20 md:rounded-2xl">
        <div className="space-y-3">
          <Image src="/static/me.png" width={100} height={100} alt={NAME} />
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
                className="px-6 py-2.5 hover:bg-gray-50 border border-gray-100 rounded-full"
              >
                <span className="text-gray-800">{book.name}</span>
              </div>
            ))}
          </section>

          <section className="py-6 space-y-1">
            <h1 className="text-2xl font-bold">Buku</h1>
            <h2 className="text-gray-600">Selesai Dibaca</h2>

            <div className="pt-3">
              <div className="grid gap-7 grid-cols-1 pt-3 md:grid-cols-3">
                {finished.slice(0, 3).map((book) => (
                  <Read book={book} key={book.id} featured />
                ))}
              </div>
              <div className="hidden gap-7 mt-3 md:grid md:grid-cols-4">
                {finished.slice(4, 7).map((book) => (
                  <Read book={book} key={book.id} />
                ))}
                <section className="h-[7.7rem] flex flex-col items-center justify-center p-3 text-sm rounded-lg">
                  <h3 className="mb-2 text-center">Tampilkan lebih banyak?</h3>
                  <Link href="/all">
                    <a className="text-groovy-violet bg-groovy-purple/10 hover:bg-groovy-purple/20 focus:ring-groovy-violet px-4 py-1.5 font-medium rounded-md transition-all duration-300 focus:ring focus:ring-opacity-40">
                      Lihat Semua
                    </a>
                  </Link>
                </section>
              </div>
            </div>
          </section>
        </div>
      </section>
    </Container>
  );
}

export async function getStaticProps() {
  const resBooks = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BOOKS}`
  );
  const dataBooks = await resBooks.json();

  const resBookmarks = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BOOKMARKS}`
  );
  const dataBookmarks = await resBookmarks.json();

  if (!dataBooks || !dataBookmarks) {
    return {
      notFound: true,
    };
  }

  const finished = dataBooks
    .filter((book) => book.status == 'Finished')
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
  const reading = dataBooks
    .filter((book) => book.status == 'Reading')
    .sort(
      (a, b) =>
        Number(new Date(b.last_updated)) - Number(new Date(a.last_updated))
    );
  const bookmarks = dataBookmarks
    .filter((mark) => mark.published)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return {
    props: {
      books: dataBooks,
      finished,
      reading,
      bookmarks,
    },
    revalidate: 1,
  };
}
