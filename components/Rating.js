import { Star } from 'phosphor-react';

const MAX_RATING = 5;

export function Rating({ rating, className }) {
  return (
    <div className={className}>
      <section className="flex">
        {Array.from(Array(MAX_RATING).keys()).map((_, i) => (
          <Star
            size={16}
            weight={i < rating ? 'fill' : 'regular'}
            key={String(i)}
            className={
              i < rating
                ? 'text-groovy-orange mr-0.5'
                : 'text-gray-300 dark:text-gray-600 mr-0.5'
            }
          />
        ))}
      </section>
    </div>
  );
}

export function RatingAlt({ rating, className }) {
  return (
    <div className={className}>
      <section className="flex items-center">
        <Star size={16} weight="fill" className="w-5 text-groovy-orange" />
        <span className="ml-1">{rating}</span>/{MAX_RATING}
      </section>
    </div>
  );
}
