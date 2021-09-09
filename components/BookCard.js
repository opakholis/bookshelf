import Link from 'next/link';
import Image from 'next/image';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import { Notepad } from 'phosphor-react';

import id from 'timeago.js/lib/lang/id_ID';
import Rating from '@/components/Rating';
import { slugByName } from '@/config/notion';

export function LinkWrapper({ children, book, className }) {
  const slug = slugByName(book.name);
  return (
    <Link href={`/[slug]`} as={`/${slug}`}>
      <a
        className={`rounded-lg focus:outline-none hover:-translate-y-1 transition duration-300 focus-visible:ring ${className}`}
      >
        {children}
      </a>
    </Link>
  );
}

export default function BookCard({ featured, book, className }) {
  timeago.register('id', id);

  return (
    <div className={className}>
      {featured && (
        <section className="relative">
          <Image
            src={book.thumbnail[0].url}
            alt={book.name}
            width={765 / 2}
            height={500 / 2}
            layout="responsive"
            objectFit="cover"
            className="rounded-t-lg"
          />
          <div className="absolute z-10 -bottom-3 left-3 px-1 py-0.5 bg-white border border-gray-50 rounded">
            <Rating rating={book.rating} className="text-sm font-medium" />
          </div>
          {book.notes && (
            <div className="absolute z-10 -right-3 -top-3 p-0.5 border-2 border-white rounded-full">
              <div className="p-1 bg-white rounded-full">
                <Notepad size={18} className="text-groovy-red" />
              </div>
            </div>
          )}
        </section>
      )}
      <section
        className={`h-[7.7rem] p-3 border border-gray-200/75 relative overflow-hidden bg-white ${
          featured ? 'rounded-b-lg' : 'rounded-lg'
        }`}
      >
        {!featured && (
          <div className="rotate-[40deg] absolute -bottom-20 -right-20 w-32 h-32 transform">
            <Image
              src={book.thumbnail[0].url}
              alt={book.name}
              width={768 / 2}
              height={500 / 2}
              layout="responsive"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )}
        <div className="flex flex-col justify-between h-full">
          <div className="text-base md:text-sm">
            <p className="mb-1 mt-1.5 font-medium leading-tight">{book.author}</p>
            <span className="text-gray-600">{book.name}</span>
          </div>
          <div className="space-y-1">
            <TimeAgo
              datetime={book.date}
              locale="id"
              className="text-gray-500 text-base md:text-xs"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
