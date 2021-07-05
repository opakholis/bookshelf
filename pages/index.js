import Container from '@/components/Container';
import Reading from '@/components/Reading';
import Read from '@/components/Read';

import { HEADLINE, NAME } from '@/utils/constant';
import Avatar from '@/components/icons/Avatar';

export default function Home({ finished, reading }) {
  return (
    <Container>
      <div className="pt-5 lg:hidden">
        <section className="via-red-500 from-cyan-400/75 to-violet-400/80 p-3 bg-gradient-to-r rounded-xl">
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-1">
              <Avatar className="w-14 h-14 rounded-full" />
            </div>
            <div className="text-shadow text-center">
              <h1 className="text-white text-lg font-medium tracking-wide">
                {NAME}
              </h1>
              <h2 className="text-white/90 text-sm italic">{HEADLINE}</h2>
            </div>
          </div>
        </section>
      </div>
      <div>
        <Reading data={reading} />
      </div>
      <div className="mb-6">
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
