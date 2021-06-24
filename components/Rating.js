import { Star } from 'react-feather';

const MAX_RATING = 5;

export default function Rating({ rating }) {
  return (
    <div className="flex mb-4">
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
    </div>
  );
}
