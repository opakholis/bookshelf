import { Star } from 'phosphor-react';

const MAX_RATING = 5;

export default function Rating({ rating, className }) {
  return (
    <div className={className}>
      <section className="md:hidden lg:flex">
        {Array.from(Array(MAX_RATING).keys()).map((_, i) => (
          <Star
            size={16}
            weight={i < rating ? 'fill' : 'regular'}
            key={String(i)}
            className={
              i < rating ? 'text-yellow-300 mr-0.5' : 'text-gray-300 mr-0'
            }
          />
        ))}
      </section>
      <section className="flex items-center lg:hidden">
        <Star size={16} weight="fill" className="w-5 text-yellow-300" />
        <span className="ml-1 font-medium">{rating}</span>/{MAX_RATING}
      </section>
    </div>
  );
}
