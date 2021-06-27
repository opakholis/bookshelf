import Container from '@/components/Container';
import Reading from '@/components/Reading';
import Read from '@/components/Read';

export default function Home({ finished, reading }) {
  return (
    <Container>
      <div className="px-7 md:px-5">
        <Reading data={reading} />
      </div>
      <div className="mb-6 px-7 md:px-5">
        <Read data={finished} />
      </div>
    </Container>
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

  const finished = data.filter((book) => book.status == 'Finished');
  const reading = data.filter((book) => book.status == 'Reading');

  return {
    props: {
      finished,
      reading,
    },
    revalidate: 1,
  };
}
