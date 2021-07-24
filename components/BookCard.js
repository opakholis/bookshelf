import Image from 'next/image';
import Rating from './Rating';

export default function BookCard({ book }) {
  return (
    <div className="border-gray-100/90 mx-auto my-8 p-6 w-3/4 dark:bg-primary-dark bg-primary-light border dark:border-gray-700 rounded-xl md:rounded-2xl">
      <div className="flex justify-start">
        <section className="relative">
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
        <section className="ml-10 w-full">
          <h1 className="mb-2 text-3xl font-bold">{book.name}</h1>
          <h2 className="mb-6 dark:text-gray-300 text-gray-500">
            {book.author}
          </h2>
          <dl className="text-gray-400 space-y-3">
            <dt className="relative float-left w-44">Non Fiksi?</dt>
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
            <dt className="relative float-left w-44">Rating</dt>
            <dd className="p-1">
              <Rating rating={book.rating} />
            </dd>
            <dt className="relative float-left w-44">Selesai Dibaca</dt>
            <dd className="p-0.5">{book.date}</dd>
          </dl>
        </section>
      </div>
    </div>
  );
}
