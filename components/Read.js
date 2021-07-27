import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';

import Rating from '@/components/Rating';
import id from 'timeago.js/lib/lang/id_ID';

export default function Read({ book, featured }) {
  const slug = slugify(book.name, { lower: true });

  timeago.register('id', id);

  return (
    <Link href={`/${slug}`}>
      <a className="rounded-md hover:-translate-y-1 transition duration-500">
        {featured && (
          <section className="relative">
            <Image
              src={book.thumbnail[0].url}
              alt={book.name}
              width={768}
              height={500}
              layout="responsive"
              objectFit="cover"
              className="rounded-t-lg"
            />
            <div className="absolute -bottom-3 left-3 px-1 py-0.5 bg-white border border-gray-50 rounded">
              <Rating rating={book.rating} className="text-sm font-medium" />
            </div>
          </section>
        )}
        <section
          className={`h-[7.7rem] p-3 border border-gray-50 relative overflow-hidden ${
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
            <div className="text-sm space-y-1">
              <p className="mt-1.5 font-medium leading-tight">{book.author}</p>
              <span className="link-custom text-gray-600">{book.name}</span>
            </div>
            <div className="space-y-1">
              <TimeAgo
                datetime={book.date}
                locale="id"
                className="text-gray-500 text-xs"
              />
            </div>
          </div>
        </section>
      </a>
    </Link>
  );
}
