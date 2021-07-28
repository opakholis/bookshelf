import { formatDate } from '@/utils/format-date';

export default function Bookmarks({ data }) {
  return (
    <div className="feed-item border-groovy-blue/30 relative pb-12 pl-6 border-l-2 last:border-transparent">
      <time
        className="absolute -top-0.5 left-6 pb-5 text-gray-500 text-xs md:text-sm"
        dateTime={data.date}
      >
        {formatDate(data.date)}
      </time>

      <section className="pt-[1.6rem] flex gap-2">
        {data.types.map((type) => (
          <div
            className="bg-groovy-red/10 px-3 py-1 text-groovy-red text-xs font-medium rounded md:text-sm"
            key={type}
          >
            {type}
          </div>
        ))}
      </section>

      <section className="flex flex-col items-start pt-2 md:flex-row md:items-center">
        <p className="relative">{data.title}</p>
        <span className="hidden mx-2 text-gray-400 md:block">&#8226;</span>
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-custom mt-1 text-gray-600 text-sm md:mt-0 md:text-base"
        >
          {data.prefix}
        </a>
      </section>
    </div>
  );
}
