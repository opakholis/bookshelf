import Image from 'next/image';
import Rating from './Rating';

import { NAME } from '@/utils/constant';
import { formatDate } from '@/utils/format-date';

export default function ReviewHeader({ book }) {
  return (
    <header>
      <div className="flex flex-col-reverse items-center justify-between md:flex-row">
        <div className="w-full space-y-4">
          <section className="w-10/12 space-y-1">
            <h1 className="font-medium">{book.author}</h1>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {book.name}
            </h2>
            <p className="text-gray-500">{book.summary}</p>
          </section>

          <section className="flex">
            <Rating rating={book.rating} />
            <span className="mx-2">&#8226;</span>
            <div>{book.total_page} Halaman</div>
            <span className="mx-2">&#8226;</span>
            <div>{book.fiction ? 'Fiksi' : 'Non Fiksi'} </div>
          </section>

          <section className="flex gap-2">
            {book.genres.map((genre) => (
              <div
                className="bg-groovy-purple/10 text-groovy-violet px-4 py-1 text-sm font-medium tracking-wide rounded"
                key={genre}
              >
                {genre}
              </div>
            ))}
          </section>
        </div>
        <div className="w-[75px] h-[75px] md:w-[150px] md:h-[150px] mb-3 mr-auto md:mb-0">
          <Image
            src={book.thumbnail[0].url}
            alt={book.name}
            width={500}
            height={500}
            layout="responsive"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex items-center mb-3 mt-8 md:mt-16">
        <Image src="/static/me.png" width={35} height={35} alt={NAME} />
        <h3 className="ml-2 text-gray-600 text-sm">
          <a
            href="https://opakholis.dev/whoami"
            target="_blank"
            rel="noopener noreferrer"
            className="link-custom"
          >
            {NAME}
          </a>
          <span className="mx-1">/</span>
          {formatDate(book.date)}
        </h3>
      </div>
    </header>
  );
}
