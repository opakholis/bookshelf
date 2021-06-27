import { useState } from 'react';
import Image from 'next/image';
import TruncateMarkup from 'react-truncate-markup';

import Rating from '@/components/Rating';

export default function Read({ data }) {
  const [sorting] = useState('finished');

  return (
    <section className="flex flex-col mt-4">
      <h1 className="mb-6 font-medium">
        Selesai Dibaca<span className="text-xs font-normal"> • </span>
        <span className="text-sm font-normal">{data?.length} Buku</span>
      </h1>
      <div className="grid gap-5 grid-cols-2 md:grid-cols-3">
        {data
          ?.sort((a, b) => {
            if (sorting === 'finished') {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            return b.date - a.date;
          })
          .map(({ cover, name, summary, author, rating, id }) => {
            return (
              <Card key={id}>
                <div>
                  <div className="md:w-[100px] md:h-[150px] px-2 rounded-md md:mr-1 md:px-0 md:rounded-xl">
                    <div className="rounded-lg shadow-md md:rounded-xl md:shadow-lg">
                      <Image
                        src={cover[0].url}
                        alt={name}
                        width={400 / 4}
                        height={600 / 4}
                        layout="responsive"
                        className="md:w-[100px] md:h-[150px] rounded-lg md:rounded-xl"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <dl className="flex flex-col justify-between h-full">
                    <div className="flex flex-col items-center justify-center pt-1 text-center md:items-start md:justify-start md:pt-1 md:text-left lg:pt-2">
                      <TruncateMarkup lines={2}>
                        <dt className="text-[15px] lg:text-[17px] mb-1 font-medium leading-tight md:mb-2 lg:mb-1">
                          {name}
                        </dt>
                      </TruncateMarkup>
                      <TruncateMarkup lines={2}>
                        <dt className="text-gray-500/90 hidden mb-2 text-sm lg:block">
                          {summary}
                        </dt>
                      </TruncateMarkup>
                      <TruncateMarkup lines={2}>
                        <dt className="text-[13px] text-gray-500">{author}</dt>
                      </TruncateMarkup>
                    </div>
                    <Rating
                      rating={rating}
                      className="hidden md:block md:pb-1 md:text-gray-500 md:text-sm lg:flex lg:pb-2"
                    />
                  </dl>
                </div>
              </Card>
            );
          })}
      </div>
    </section>
  );
}

export function Card({ children }) {
  const colors = [
    'bg-yellow-100',
    'bg-blue-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-teal-100',
    'bg-violet-100',
    'bg-cyan-100',
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={[
        color,
        'flex flex-col md:flex-row p-4 lg:p-5 rounded-xl md:rounded-2xl space-y-1 md:space-x-2 lg:space-x-4',
      ].join(' ')}
    >
      {children}
    </div>
  );
}
