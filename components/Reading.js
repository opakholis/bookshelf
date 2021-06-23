import Image from 'next/image';
import Slider from 'react-slick';
import TruncateMarkup from 'react-truncate-markup';

export default function Reading({ data }) {
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
    <section className="mb-20">
      <h1 className="mb-6 text-xl font-semibold">Sedang dibaca</h1>
      <Slider {...settings}>
        {data.map(
          ({ Cover: image, Name: title, Author: author, Genres, id }) => {
            return (
              <div key={id}>
                <div className="flex flex-row">
                  <div className="relative mr-24">
                    <div className="absolute w-72 h-72 bg-blue-200 rounded-full" />
                    <div className="ml-11">
                      <Image
                        src={image[0].url}
                        width={400 / 2}
                        height={600 / 2}
                        className="rounded-2xl"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 space-y-5">
                    <TruncateMarkup lines={2}>
                      <h2 className="text-5xl font-semibold tracking-tight">
                        {title}
                      </h2>
                    </TruncateMarkup>
                    <h3 className="text-gray-500 uppercase">{author}</h3>
                    <p className="pt-6">
                      {Genres.map((genre, id) => (
                        <span
                          className="mr-3 px-2 py-1 text-gray-900 text-sm bg-blue-200 rounded"
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
  );
}
