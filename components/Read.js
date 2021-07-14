import Image from 'next/image';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import TruncateMarkup from 'react-truncate-markup';

import Rating from '@/components/Rating';
import id from 'timeago.js/lib/lang/id_ID';

export default function Read({ book }) {
  timeago.register('id', id);

  return (
    <div className="h-[8.8rem] border-gray-100/90 flex flex-row p-3 w-full bg-white border rounded-xl hover:-translate-y-1 transition-all duration-300 md:rounded-2xl lg:p-4">
      <section className="relative">
        <div className="rounded-md md:rounded-xl">
          <div className="w-[92px] h-[138px] absolute bottom-1 left-1 mr-4 rounded-lg drop-shadow-md md:rounded-xl">
            <Image
              src={book.cover[0].url}
              alt={book.name}
              width={400 / 4}
              height={600 / 4}
              layout="responsive"
              objectFit="cover"
              className="w-[92px] h-[138px] rounded-lg"
            />
          </div>
        </div>
      </section>
      <section className="ml-[6.8rem]">
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-1">
            <TruncateMarkup lines={2}>
              <p className="text-[15px] lg:text-[17px] font-medium leading-tight">
                {book.name}
              </p>
            </TruncateMarkup>
            <TruncateMarkup lines={2}>
              <p className="text-[13px] text-gray-500">{book.author}</p>
            </TruncateMarkup>
          </div>
          <div className="space-y-1">
            <Rating
              rating={book.rating}
              className="md:pb-1 md:text-gray-500 md:text-sm lg:flex"
            />
            <TimeAgo
              datetime={book.date}
              locale="id"
              className="text-gray-500 text-xs"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
