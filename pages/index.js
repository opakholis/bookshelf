import Image from 'next/image';
import TruncateMarkup from 'react-truncate-markup';
import Slider from 'react-slick';

import SEO from '@/components/SEO';

export default function Home({ finished, reading }) {
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  return (
    <>
      <SEO />
      <main className="container mx-auto py-6">
        <section className="mb-20">
          <h1 className="font-semibold text-xl mb-6">Sedang dibaca</h1>
          <Slider {...settings}>
            {reading.map(
              ({ Cover: image, Name: title, Author: author, Genres, id }) => {
                return (
                  <div key={id}>
                    <div className="flex flex-row">
                      <div className="relative mr-24">
                        <div className="absolute rounded-full bg-blue-200 w-72 h-72" />
                        <div className="ml-11">
                          <Image
                            src={image[0].url}
                            width={400 / 2}
                            height={600 / 2}
                            className="rounded-2xl"
                          />
                        </div>
                      </div>
                      <div className="space-y-5 w-1/2">
                        <TruncateMarkup lines={2}>
                          <h2 className="font-semibold text-5xl tracking-tight">
                            {title}
                          </h2>
                        </TruncateMarkup>
                        <h3 className="text-gray-500 uppercase">{author}</h3>
                        <p className="pt-6">
                          {Genres.map((genre, id) => (
                            <span
                              className="bg-blue-200 mr-3 py-1 px-2 rounded text-gray-900 text-sm"
                              key={id}
                            >
                              {genre}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </Slider>
        </section>
        <section className="">
          <h1 className="font-semibold text-xl mb-6">Telah dibaca</h1>
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
                    className="flex w-[275px] bg-yellow-100 rounded-2xl space-x-4 p-6"
                  >
                    <div className="flex-2">
                      <Image
                        src={image[0].url}
                        width={400 / 4}
                        height={600 / 4}
                        className="rounded-lg"
                      />
                    </div>
                    <dl className="flex-1">
                      <TruncateMarkup lines={2}>
                        <dt className="font-medium text-lg mb-1">{title}</dt>
                      </TruncateMarkup>
                      <TruncateMarkup lines={2}>
                        <dt className="text-sm text-gray-500 mb-4">{author}</dt>
                      </TruncateMarkup>
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
