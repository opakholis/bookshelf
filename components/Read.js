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
                <figure className="flex-2">
                  <Image
                    src={cover[0].url}
                    alt={name}
                    objectFit="cover"
                    width={400 / 4}
                    height={600 / 4}
                    className="rounded-lg"
                  />
                </figure>

                <dl className="flex flex-1 flex-col justify-between">
                  <div className="mt-2">
                    <TruncateMarkup lines={2}>
                      <dt className="mb-2 text-lg font-medium leading-tight">
                        {name}
                      </dt>
                    </TruncateMarkup>
                    <TruncateMarkup lines={1}>
                      <dt className="mb-3 text-gray-600">{summary}</dt>
                    </TruncateMarkup>
                    <TruncateMarkup lines={2}>
                      <dt className="mb-4 text-gray-500 text-sm">{author}</dt>
                    </TruncateMarkup>
                  </div>
                  <Rating rating={rating} />
                </dl>
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
