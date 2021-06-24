import { useState } from 'react';
import Image from 'next/image';
import TruncateMarkup from 'react-truncate-markup';

import Rating from '@/components/Rating';

export default function Read({ data }) {
  const [sorting, setSorting] = useState('finished');

  return (
    <section className="flex flex-col mt-4">
      <h1 className="mb-6 text-2xl font-semibold">Selesai dibaca</h1>
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-3">
        {data
          ?.sort((a, b) => {
            if (sorting === 'finished') {
              return new Date(b.Date).getTime() - new Date(a.Date).getTime();
            }
            return b.Date - a.Date;
          })
          .map(
            ({
              Cover: image,
              Name: title,
              Author: author,
              Rating: rating,
              id,
            }) => {
              return (
                <Card key={id}>
                  <figure className="flex-2">
                    <Image
                      src={image[0].url}
                      width={400 / 4}
                      height={600 / 4}
                      className="rounded-lg object-cover"
                    />
                  </figure>

                  <dl className="flex flex-1 flex-col justify-between">
                    <div>
                      <TruncateMarkup lines={2}>
                        <dt className="text-md mb-1 font-medium">{title}</dt>
                      </TruncateMarkup>
                      <TruncateMarkup lines={2}>
                        <dt className="mb-4 text-gray-500 text-sm">{author}</dt>
                      </TruncateMarkup>
                    </div>
                    <Rating rating={rating} />
                  </dl>
                </Card>
              );
            }
          )}
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
