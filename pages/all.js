import Container from '@/components/Container';
import Read from '@/components/Read';
import FormSuggestion from '@/components/FormSuggestion';

export default function All({ finished }) {
  return (
    <Container
      title="Semua Buku - Opa Kholis Majid"
      description="Halaman ini berisi resensi, catatan, dan ulasan terhadap Buku yang
          sudah saya baca."
    >
      <div className="h-[420px] absolute -top-20 w-full bg-groovy-orange" />
      <section className="relative z-50 mt-20 mx-auto p-6 w-full max-w-screen-md bg-white rounded-2xl">
        <div className="leading-7 space-y-3">
          <h1 className="pb-3 text-gray-900 text-2xl font-bold">
            Koleksi Buku
          </h1>
          <p>
            Mulai gemar membaca di awal tahun 2021, dengan didasari oleh hasutan
            teman yang berhasil membuka minat saya terhadap dunia literatur.
          </p>
          <p>
            Dan hei, halaman ini berisi buku-buku yang telah saya baca dengan
            resensi dan ulasan terhadap buku tersebut. Enjoy!
          </p>
        </div>
        <div className="my-6">
          <FormSuggestion />
        </div>
        <div className="grid gap-7 grid-cols-1 pt-3 lg:gap-x-5 lg:grid-cols-2 xl:grid-cols-3">
          {finished.map((book) => (
            <Read book={book} key={book.id} featured />
          ))}
        </div>
      </section>
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
