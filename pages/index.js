import SEO from '@/components/SEO';
import Reading from '@/components/Reading';
import Read from '@/components/Read';
import Sidebar from '@/components/Sidebar';

export default function Home({ finished, reading }) {
  return (
    <>
      <SEO />
      <section className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="px-10">
            <Reading data={reading} />
          </div>
          <div className="mb-10 px-10">
            <Read data={finished} />
          </div>
        </main>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BOOKS}`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  const finished = data.filter((book) => book.Status == 'Finished');
  const reading = data.filter((book) => book.Status == 'Reading');

  return {
    props: {
      finished,
      reading,
    },
    revalidate: 1,
  };
}
