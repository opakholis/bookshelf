import Image from 'next/image';
import TruncateMarkup from 'react-truncate-markup';

export default function Read({ data }) {
  return (
    <section className="">
      <h1 className="mb-6 text-xl font-semibold">Telah dibaca</h1>
      <div className="flex space-x-5">
        {data.map(
          ({
            Cover: image,
            Name: title,
            Author: author,
            Rating: rating,
            id,
          }) => {
            return (
              <div
                key={id}
                className="w-[275px] flex p-6 bg-yellow-100 rounded-2xl space-x-4"
              >
                <div className="flex-2">
                  <Image
                    src={image[0].url}
                    width={400 / 4}
                    height={600 / 4}
                    className="rounded-lg"
                  />
                </div>
                <dl className="flex-1">
                  <TruncateMarkup lines={2}>
                    <dt className="mb-1 text-lg font-medium">{title}</dt>
                  </TruncateMarkup>
                  <TruncateMarkup lines={2}>
                    <dt className="mb-4 text-gray-500 text-sm">{author}</dt>
                  </TruncateMarkup>
                  <dt>{rating}</dt>
                </dl>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}
