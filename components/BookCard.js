import Image from 'next/image';
import Rating from './Rating';

export default function BookCard({ book }) {
  return (
    <div className="border-gray-100/90 mx-auto my-6 p-6 w-full dark:bg-primary-dark bg-primary-light border dark:border-gray-700 rounded-xl md:ml-2 md:rounded-2xl xl:w-3/4">
      <div className="flex flex-col justify-start md:flex-row">
        <section className="relative mb-5 mx-auto md:mb-0">
          <div className="rounded-lg md:rounded-xl">
            <div className="w-[200px] h-[300px] rounded-lg md:rounded-xl">
              <Image
                src={book.cover[0].url}
                alt={book.name}
                width={400}
                height={600}
                layout="responsive"
                objectFit="cover"
                className="w-[200px] h-[300px] rounded-lg md:rounded-xl"
              />
            </div>
          </div>
        </section>
        <section className="w-full md:ml-10">
          <div className="text-center md:text-left">
            <h1 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
              {book.name}
            </h1>
            <h2 className="mb-6 dark:text-gray-300 text-gray-500">
              {book.author}
            </h2>
          </div>
          <dl className="text-gray-400 space-y-3">
            <dt className="relative float-left w-32 md:w-44">Non Fiksi?</dt>
            <dd className="">
              <label htmlFor="non-fiction" className="sr-only">
                Non-fiction
              </label>
              <input
                type="checkbox"
                checked={!book.fiction}
                className="form-checkbox w-4 h-4 rounded-full"
                readOnly
                id="non-fiction"
              />
            </dd>
            <dt className="relative float-left w-32 md:w-44">Rating</dt>
            <dd className="p-1">
              <Rating rating={book.rating} />
            </dd>
            <dt className="relative float-left w-32 md:w-44">Selesai Dibaca</dt>
            <dd className="p-0.5">{book.date}</dd>
          </dl>
        </section>
      </div>
    </div>
  );
}
