import { RatingAlt } from './Rating';

export default function BookCard({ book }) {
  console.log(`book`, book);
  return (
    <div className="flex justify-center mx-auto my-6 w-full">
      <div className="md:ml-2 xl:w-3/4">
        <div className="flex flex-col justify-center">
          <section className="text-center">
            <h1 className="mb-2 mt-8 text-2xl font-bold lg:text-3xl">
              {book.name}
            </h1>
            <h2 className="mb-6 dark:text-gray-300 text-gray-500">
              {book.author}
            </h2>
          </section>
          <section className="flex justify-center text-sm space-x-2">
            <div className="bg-groovy-orange/25 px-3 py-2 rounded-md">
              {!book.fiction && <span>Non Fiksi</span>}
            </div>
            <div className="bg-groovy-purple/25 px-3 py-2 rounded-md">
              <span>{book.genres[0]}</span>
            </div>
            <div className="bg-groovy-blue/25 px-3 py-2 rounded-md">
              <RatingAlt rating={book.rating} />
            </div>
            <div className="bg-groovy-red/25 hidden px-3 py-2 rounded-md md:block">
              <span>{book.total_page} Halaman</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
