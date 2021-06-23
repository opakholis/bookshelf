import SEO from '@/components/SEO';
import Reading from '@/components/Reading';
import Read from '@/components/Read';

export default function Home({ finished, reading }) {
  return (
    <>
      <SEO />
      <main className="container mx-auto py-6">
        <Reading data={reading} />
        <Read data={finished} />
      </main>
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
