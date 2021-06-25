import Image from 'next/image';
import Slider from 'rc-slider';
import TruncateMarkup from 'react-truncate-markup';
import SwiperCore, { Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Book } from 'react-feather';

import { shimmer, toBase64 } from '@/utils/shimmer';
import Highlight from '@/components/Highlight';
import Persentase from '@/utils/persentase';

SwiperCore.use([Autoplay]);

export default function Reading({ data }) {
  const reading = data[Math.floor(Math.random() * data.length)];

  return (
    <section className="relative mb-10 lg:mb-20">
      <h1 className="my-6 font-medium">
        Sedang{' '}
        <Highlight delay={1000} color="#fff176">
          Dibaca
        </Highlight>
      </h1>
      <section className="relative lg:hidden">
        <div className="border-gray-200/80 flex p-4 w-full border rounded-xl space-x-5">
          <div>
            <div className="w-[80px] h-[120px] rounded-lg shadow-lg">
              <Image
                src={reading.cover[0].url}
                width={400}
                height={600}
                alt={reading.name}
                objectFit="cover"
                layout="responsive"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(80, 120)
                )}`}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center w-full space-y-2">
            <h1 className="text-[15px] font-medium leading-tight">
              {reading.name}
            </h1>
            <h3 className="text-[13px] text-gray-500">{reading.author}</h3>
            <div className="flex items-center w-11/12">
              <Slider
                className="slider-thin"
                startPoint={0}
                max={reading.total_page}
                value={reading.current_page}
              />
              <Persentase
                book={reading}
                className="ml-2 text-gray-500 text-xs"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="hidden lg:block">
        <Swiper
          slidesPerView={'auto'}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
        >
          {data.map((book, id) => (
            <SwiperSlide
              key={id}
              className="flex flex-col md:flex-row md:w-3/4"
            >
              <section className="relative mr-24">
                <div className="bg-blue-100/40 z-[-1] absolute hidden w-72 h-72 rounded-full md:block" />
                <div className="md:ml-11">
                  <div className="rounded-2xl">
                    <Image
                      src={book?.cover[0].url}
                      width={400 / 2}
                      height={600 / 2}
                      alt={book?.name}
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(200, 300)
                      )}`}
                      className="rounded-2xl"
                    />
                  </div>
                </div>
              </section>
              <section className="flex flex-col justify-between w-4/5 md:w-1/2">
                <div className="w-3/4 space-y-1 md:space-y-2">
                  <TruncateMarkup lines={2}>
                    <h2 className="text-lg font-bold tracking-tight md:text-xl lg:text-3xl">
                      {book?.name}
                    </h2>
                  </TruncateMarkup>
                  <TruncateMarkup lines={2}>
                    <h2 className="text-gray-500 text-sm md:text-base">
                      {book?.summary}
                    </h2>
                  </TruncateMarkup>
                  <h4 className="md:text-[17px] text-gray-500 text-base uppercase">
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
                    <div className="flex items-center">
                      <Slider
                        className="mr-2"
                        startPoint={0}
                        max={book?.total_page}
                        value={book?.current_page}
                      />
                      <Persentase book={book} />
                    </div>
                  </div>
                  {/* <p>Terakhir membaca: {book?.last_updated}</p> */}
                  <a
                    href={book?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-blue-400/75 hover:bg-blue-500/75 flex items-center justify-center px-1 py-2 w-1/3 text-white font-medium rounded-md outline-none transition duration-200 focus:ring-2">
                      <Book className="mr-2 w-4" />
                      Ayo Baca
                    </button>
                  </a>
                </div>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
}
