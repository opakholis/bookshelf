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

      <section className="pt-[1.6rem] flex gap-2 mb-1">
        {data.types.map((type) => (
          <div
            className="bg-groovy-red/10 px-3 py-1 text-groovy-red text-xs font-medium rounded md:text-sm"
            key={type}
          >
            {type}
          </div>
        ))}
      </section>

      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:border-groovy-violet/50 border-[2.5px] flex flex-col items-start -mx-2 py-2 w-full border-dashed border-transparent rounded focus:outline-none transition duration-300 focus-visible:ring md:flex-row md:items-center"
      >
        <p className="relative pl-2">{data.title}</p>
        <span className="hidden mx-2 text-gray-400 md:block">&#8226;</span>
        <span className="link-custom ml-2 mt-1 text-gray-600 text-sm md:ml-0 md:mt-0 md:text-base">
          {data.prefix}
        </span>
      </a>
    </div>
  );
}
