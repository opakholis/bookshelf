import { Star } from 'phosphor-react';

export default function Rating({ rating, className }) {
  return (
    <div className={className}>
      <section className="flex items-center">
        <Star
          size={16}
          weight="fill"
          className="w-5 text-groovy-yellow md:w-4"
        />
        <span className="pl-0.5">{rating}</span>
      </section>
    </div>
  );
}
