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
        spaceBetween={1}
        autoplay={1000}
        pagination={{
          clickable: true,
        }}
      >
        {data.map(
          ({ Cover: image, Name: title, Author: author, Genres, id }) => {
            return (
              <SwiperSlide key={id} className="flex flex-row w-3/4">
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
                    <h2 className="text-4xl font-semibold tracking-tight">
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
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </section>
  );
}
