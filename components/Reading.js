import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import TruncateMarkup from 'react-truncate-markup';

SwiperCore.use([Pagination]);

export default function Reading({ data }) {
  return (
    <section className="mb-20">
      <h1 className="my-6 text-2xl font-semibold">Sedang dibaca</h1>
      <Swiper
        slidesPerView={'auto'}
        pagination={{
          clickable: true,
        }}
      >
        {data.map(
          ({ Cover: image, Name: title, Author: author, Genres, id }) => {
            return (
              <SwiperSlide
                key={id}
                className="flex flex-col md:flex-row md:w-3/4"
              >
                <div className="relative mr-24">
                  <div className="absolute hidden w-72 h-72 bg-blue-100 rounded-full backdrop-blur-2xl md:block" />
                  <div className="w-30 h-30 md:ml-11">
                    <Image
                      src={image[0].url}
                      width={400 / 2}
                      height={600 / 2}
                      className="w-30 h-30 rounded-2xl"
                    />
                  </div>
                </div>
                <div className="space-y-1w w-5/6 md:w-1/2 md:space-y-5">
                  <TruncateMarkup lines={2}>
                    <h2 className="text-lg font-semibold tracking-tight md:text-xl lg:text-4xl">
                      {title}
                    </h2>
                  </TruncateMarkup>
                  <h3 className="text-gray-500 text-sm uppercase md:text-base">
                    {author}
                  </h3>
                  <p className="hidden pt-6 md:block">
                    {Genres.map((genre, id) => (
                      <span
                        className="mr-3 px-2 py-1 text-gray-900 text-xs bg-blue-200 rounded md:text-sm"
                        key={id}
                      >
                        {genre}
                      </span>
                    ))}
                  </p>
                </div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </section>
  );
}
