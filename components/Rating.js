import { Star } from 'react-feather';

const MAX_RATING = 5;

export default function Rating({ rating, className }) {
  return (
    <div className={className}>
      <section className="md:hidden lg:flex">
        {Array.from(Array(MAX_RATING).keys()).map((_, i) => (
          <Star
            key={String(i)}
            className={
              i < rating
                ? 'fill-current text-yellow-300 w-5 stroke-0'
                : 'text-gray-300 opacity-60 w-5 fill-current'
            }
          />
        ))}
      </section>
      <section className="flex items-center lg:hidden">
        <Star className="w-5 text-yellow-300 fill-current stroke-0" />
        <span className="ml-1 font-medium">{rating}</span>/{MAX_RATING}
      </section>
    </div>
  );
}
