import Image from 'next/image';
import Slider from 'rc-slider';
import TruncateMarkup from 'react-truncate-markup';
import { Swiper, SwiperSlide } from 'swiper/react';

import { shimmer, toBase64 } from '@/utils/shimmer';
import Highlight from '@/components/Highlight';
import Persentase from '@/utils/persentase';

export default function Reading({ data }) {
  return (
    <section className="relative mb-10">
      <h1 className="mb-3 mt-6 font-medium lg:mb-6">
        Sedang{' '}
        <Highlight delay={1000} color="#fff176">
          Dibaca
        </Highlight>
      </h1>

      <section>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={20}
          freeMode={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 'auto',
            },
          }}
          className="w-full"
        >
          {data.map((book, id) => (
            <SwiperSlide key={id} className="w-[312px] p-3 bg-white rounded-lg">
              <div className="flex flex-row space-x-4">
                <section className="relative">
                  <div className="md:w-[50px] md:h-[75px]">
                    <div className="rounded">
                      <Image
                        src={book?.cover[0].url}
                        width={100}
                        height={150}
                        alt={book?.name}
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(50, 75)
                        )}`}
                        className="md:w-[50px] md:h-[75px] rounded"
                      />
                    </div>
                  </div>
                </section>
                <section className="flex flex-col justify-center w-10/12 space-y-1.5">
                  <TruncateMarkup lines={1}>
                    <h2 className="font-medium">{book?.name}</h2>
                  </TruncateMarkup>
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <p>
                      {book.current_page} / {book.total_page}
                    </p>
                    <Persentase book={book} />
                  </div>
                  <Slider
                    startPoint={0}
                    max={book?.total_page}
                    value={book?.current_page}
                  />
                </section>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
}
