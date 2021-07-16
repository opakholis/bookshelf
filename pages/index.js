import Link from 'next/link';

import Container from '@/components/Container';
import Reading from '@/components/Reading';
import Read from '@/components/Read';

import { CAPTION, NAME } from '@/utils/constant';
import Avatar from '@/components/icons/Avatar';

export default function Home({ books, reading, finished }) {
  return (
    <Container books={books}>
      <div className="pt-5 md:hidden">
        <section className="p-3 bg-gradient-to-r rounded-xl from-groovy-purple to-groovy-blue">
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-1">
              <Avatar className="w-14 h-14 rounded-full" />
            </div>
            <div className="text-shadow text-center">
              <h1 className="text-white text-lg font-medium tracking-wide">
                {NAME}
              </h1>
              <h2 className="text-white/90 text-sm italic">{CAPTION}</h2>
            </div>
          </div>
        </section>
      </div>
      <div>
        <h1 className="mb-3 mt-6 font-medium lg:mb-6">
          Sedang Dibaca<span className="text-xs font-normal"> • </span>
          <span className="text-sm font-normal">{reading?.length} Buku</span>
        </h1>
        <Reading data={reading} />
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-medium">
            Selesai Dibaca<span className="text-xs font-normal"> • </span>
            <span className="text-sm font-normal">{finished?.length} Buku</span>
          </h1>
          <Link href="/all">
            <a className="hover:text-gray-500 text-sm transition-all duration-200">
              Lihat semua &rarr;
            </a>
          </Link>
        </div>
        <div>
          <div className="grid gap-7 grid-cols-1 lg:gap-x-5 lg:grid-cols-2 xl:grid-cols-3">
            {finished
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .slice(0, 6)
              .map((book, idx) => {
                return <Read book={book} key={idx} />;
              })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BOOKS}`
  );
  const books = await res.json();

  if (!books) {
    return {
      notFound: true,
    };
  }

  const finished = books.filter((book) => book.status == 'Finished');
  const reading = books.filter((book) => book.status == 'Reading');

  return {
    props: {
      books,
      finished,
      reading,
    },
    revalidate: 1,
  };
}
