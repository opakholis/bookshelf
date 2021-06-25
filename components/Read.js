import { useState } from 'react';
import Image from 'next/image';
import TruncateMarkup from 'react-truncate-markup';

import Rating from '@/components/Rating';

export default function Read({ data }) {
  const [sorting, setSorting] = useState('finished');
  console.log(data.length);
  return (
    <section className="flex flex-col mt-4">
      <h1 className="mb-6 font-medium">
        Selesai Dibaca<span className="text-xs font-normal"> • </span>
        <span className="text-sm font-normal">{data?.length} Buku</span>
      </h1>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                <div className="w-[100px] h-[150px] flex-2 mr-1">
                  <div className="rounded-xl shadow-lg">
                    <Image
                      src={cover[0].url}
                      alt={name}
                      width={400 / 4}
                      height={600 / 4}
                      layout="responsive"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <dl className="flex flex-col justify-between h-full">
                    <div className="pt-2">
                      <TruncateMarkup lines={2}>
                        <dt className="text-md mb-1 font-medium leading-tight">
                          {name}
                        </dt>
                      </TruncateMarkup>
                      <TruncateMarkup lines={2}>
                        <dt className="text-gray-500/90 mb-2 text-sm">
                          {summary}
                        </dt>
                      </TruncateMarkup>
                      <TruncateMarkup lines={2}>
                        <dt className="pb-4 text-gray-600 text-sm">{author}</dt>
                      </TruncateMarkup>
                    </div>
                    <Rating rating={rating} className="flex pb-2" />
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
    <div className={[color, 'flex p-5 rounded-2xl space-x-4'].join(' ')}>
      {children}
    </div>
  );
}
