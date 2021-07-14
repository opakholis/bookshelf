import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Book } from 'phosphor-react';

import { shimmer, toBase64 } from '@/utils/shimmer';
import Persentase from '@/utils/persentase';
import ProgressBar from './ProgressBar';

export default function Reading({ data }) {
  return (
    <section className="relative mb-10">
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
          {data
            .sort(
              (a, b) =>
                new Date(b.last_updated).getTime() -
                new Date(a.last_updated).getTime()
            )
            .map((book, id) => (
              <SwiperSlide
                key={id}
                className="w-[300px] p-3 bg-white rounded-lg"
              >
                <div className="flex flex-row space-x-4">
                  <section className="relative">
                    <div className="w-[50px] h-[75px]">
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
                          className="w-[50px] h-[75px] rounded"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="flex flex-col justify-center w-3/4 space-y-1.5">
                    <h2 className="font-medium truncate">{book?.name}</h2>
                    <div className="text-[13px] flex items-center justify-between text-gray-500">
                      <p className="flex items-center">
                        <Book size={16} />
                        <span className="ml-1">
                          {book.current_page} / {book.total_page}
                        </span>
                      </p>
                      <Persentase book={book} />
                    </div>
                    <ProgressBar
                      current={book?.current_page}
                      total={book?.total_page}
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
