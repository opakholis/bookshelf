import Image from 'next/image';
import TruncateMarkup from 'react-truncate-markup';

import Rating from '@/components/Rating';

export default function Read({ book }) {
  return (
    <div className="flex flex-col p-4 bg-white rounded-xl shadow-sm space-y-1 md:flex-row md:rounded-2xl md:space-x-2 lg:p-5 lg:space-x-4">
      <section>
        <div className="md:w-[83px] md:h-[125px] px-2 rounded-md md:mr-1 md:px-0 md:rounded-xl">
          <div className="rounded-lg drop-shadow-md md:rounded-xl">
            <Image
              src={book.cover[0].url}
              alt={book.name}
              width={400 / 4}
              height={600 / 4}
              layout="responsive"
              className="md:w-[83px] md:h-[125px] rounded-lg"
            />
          </div>
        </div>
      </section>
      <section>
        <dl className="flex flex-col justify-center h-full">
          <div className="flex flex-col items-center justify-center pt-1 text-center md:items-start md:justify-start md:pt-1 md:text-left lg:pt-2">
            <TruncateMarkup lines={2}>
              <dt className="text-[15px] lg:text-[17px] mb-1 font-medium leading-tight md:mb-2">
                {book.name}
              </dt>
            </TruncateMarkup>
            <TruncateMarkup lines={2}>
              <dt className="text-[13px] text-gray-500 md:mb-2">
                {book.author}
              </dt>
            </TruncateMarkup>
          </div>
          <Rating
            rating={book.rating}
            className="hidden md:block md:pb-1 md:text-gray-500 md:text-sm lg:flex"
          />
        </dl>
      </section>
    </div>
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
