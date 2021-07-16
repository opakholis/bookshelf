import Container from '@/components/Container';
import Read from '@/components/Read';

export default function All({ books, finished }) {
  return (
    <Container books={books}>
      <div className="flex flex-col items-center justify-center mb-12 mt-10">
        <h1 className="text-3xl font-bold">Buku-Buku</h1>
        <p className="text-gray-400">Yang telah dibaca</p>
      </div>
      <div>
        <div className="grid gap-7 grid-cols-1 lg:gap-x-5 lg:grid-cols-2 xl:grid-cols-3">
          {finished
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((book, idx) => {
              return <Read book={book} key={idx} />;
            })}
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

  return {
    props: {
      books,
      finished,
    },
    revalidate: 1,
  };
}
