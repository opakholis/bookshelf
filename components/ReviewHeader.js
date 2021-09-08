import Image from 'next/image';
import Rating from './Rating';

export default function ReviewHeader({ book }) {
  return (
    <header className="mx-auto p-6 w-full max-w-screen-md">
      <div className="flex flex-col-reverse items-center justify-between md:flex-row">
        <div className="w-full space-y-4">
          <section className="w-10/12 space-y-1.5">
            <h1 className="font-medium">{book.author}</h1>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{book.name}</h2>
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
                className="bg-groovy-purple/10 px-4 py-1 text-groovy-violet text-sm font-medium tracking-wide rounded"
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
            width={500 / 2}
            height={500 / 2}
            layout="responsive"
            objectFit="cover"
            className="w-[75px] h-[75px] md:w-[150px] md:h-[150px] rounded-lg"
          />
        </div>
      </div>
    </header>
  );
}
