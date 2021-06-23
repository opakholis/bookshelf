import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import image from 'next/image';

// import { NotionRenderer } from 'react-notion';

export default function Home({ finished, reading }) {
  console.log(finished);
  return (
    <>
      <Head>
        <title>Opa's Bookshelves</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-6">
        <section className="mb-20">
          <h1 className="font-semibold text-xl mb-6">Sedang dibaca &rarr;</h1>
          {reading.map(
            ({ Cover: image, Name: title, Author: author, Genres, id }) => {
              return (
                <div key={id} className="flex">
                  <div className="relative flex items-center w-1/3">
                    <div className="absolute rounded-full bg-blue-200 w-72 h-72" />
                    <div className="shadow-xl ml-9">
                      <Image
                        src={image[0].url}
                        width={218}
                        height={328}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="font-semibold text-6xl">{title}</h2>
                    <h3 className="text-xl text-gray-500 uppercase">
                      {author}
                    </h3>
                    <p className="pt-6">
                      {Genres.map((genre, id) => (
                        <span
                          className="bg-blue-200 mr-3 py-1 px-2 rounded text-gray-900"
                          key={id}
                        >
                          {genre}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </section>
        <section className="">
          <h1 className="font-semibold text-xl mb-6">Telah dibaca &rarr;</h1>
          <div className="flex space-x-5">
            {finished.map(
              ({
                Cover: image,
                Name: title,
                Author: author,
                Rating: rating,
                id,
              }) => {
                return (
                  <div
                    key={id}
                    className="flex p-4 bg-yellow-100 rounded-2xl space-x-4"
                  >
                    <Image
                      src={image[0].url}
                      width={218 / 2}
                      height={328 / 2}
                      className="rounded-xl"
                    />
                    <dl>
                      <dt className="font-semibold text-lg mb-1">{title}</dt>
                      <dt className="text-gray-600 mb-4">{author}</dt>
                      <dt>{rating}</dt>
                    </dl>
                  </div>
                );
              }
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    'https://notion-api.splitbee.io/v1/table/a07be24ad99a4805b46d24d339bbc474'
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
