import Image from 'next/image';
import Slider from 'rc-slider';
import TruncateMarkup from 'react-truncate-markup';
import SwiperCore, { Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowRight } from 'react-feather';

SwiperCore.use([Autoplay]);

export default function Reading({ data }) {
  console.log(data);
  return (
    <section className="mb-20">
      <h1 className="my-6 text-2xl font-semibold">Sedang dibaca</h1>
      <Swiper
        slidesPerView={'auto'}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
      >
        {data.map((book, id) => (
          <SwiperSlide key={id} className="flex flex-col md:flex-row md:w-3/4">
            <section className="relative mr-24">
              <div className="absolute hidden w-72 h-72 bg-blue-100 rounded-full backdrop-blur-2xl md:block" />
              <div className="w-30 h-30 md:ml-11">
                <Image
                  src={book?.cover[0].url}
                  width={400 / 2}
                  height={600 / 2}
                  className="w-30 h-30 rounded-2xl"
                />
              </div>
            </section>
            <section className="flex flex-col justify-between w-4/5 md:w-1/2">
              <div className="space-y-1 md:space-y-2">
                <TruncateMarkup lines={2}>
                  <h2 className="text-lg font-semibold tracking-tight md:text-xl lg:text-4xl">
                    {book?.name}
                  </h2>
                </TruncateMarkup>
                <TruncateMarkup lines={2}>
                  <h2 className="text-gray-500 text-sm md:text-base">
                    {book?.summary}
                  </h2>
                </TruncateMarkup>
                <h4 className="text-gray-500 text-base uppercase md:text-lg">
                  {book?.author}
                </h4>
                <div>
                  {book?.genres.map((genre, id) => (
                    <span
                      className="mr-1 px-2 py-1 text-sm border border-dashed border-blue-300 lowercase"
                      key={id}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <div className="py-4 w-1/2">
                  <p className="mb-1 font-medium">Progres </p>
                  <Slider
                    startPoint={0}
                    max={book?.total_page}
                    value={book?.current_page}
                  />
                </div>
                {/* <p>Terakhir membaca: {book?.last_updated}</p> */}

                <a href={book?.link} target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-400/75 flex items-center justify-center py-3 w-1/3 text-white font-medium rounded-md focus:ring-2">
                    Ayo Baca <ArrowRight className="ml-1 w-4" />
                  </button>
                </a>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
