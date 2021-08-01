import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { CaretDown, CheckCircle } from 'phosphor-react';

import Container from '@/components/Container';
import BookCard from '@/components/BookCard';
import FormSuggestion from '@/components/FormSuggestion';

import { getBooksTable } from '@/config/notion';

const sortOptions = [{ name: 'Terbaru' }, { name: 'Rating' }];

export default function All({ finished }) {
  const [sorting, setSorting] = useState(sortOptions[0].name);
  const [searchValue, setSearchValue] = useState('');

  const filteredBooks = finished
    .sort((a, b) => {
      if (sorting === 'Terbaru') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.rating - a.rating;
    })
    .filter(
      (f) =>
        f.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        f.author.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <Container
      title="Koleksi Buku - Opa Kholis Majid"
      description="Halaman ini berisi resensi, catatan, dan ulasan terhadap Buku yang
          sudah saya baca."
      searchBar={(e) => setSearchValue(e.target.value)}
    >
      <div className="h-[420px] absolute -top-24 w-full bg-groovy-lilac" />
      <main className="relative z-40 mx-auto p-6 w-full max-w-screen-sm bg-white rounded-xl md:mt-20 md:max-w-screen-md">
        <div className="leading-7 space-y-3">
          <h1 className="pb-3 text-gray-900 text-2xl font-bold">
            Koleksi Buku
          </h1>
          <p>
            Mulai gemar membaca di awal tahun 2021, dengan didasari oleh hasutan
            teman yang berhasil membuka minat saya terhadap dunia literatur.
          </p>
          <p>
            Dan hei, halaman ini berisi buku-buku yang telah saya baca dengan
            resensi dan ulasan terhadap buku tersebut. Enjoy!
          </p>
        </div>
        <div className="my-6">
          <FormSuggestion />
        </div>

        <div className="my-6">
          <Listbox value={sorting} onChange={setSorting}>
            <Listbox.Label className="float-left">
              Urutkan Berdasarkan:{' '}
            </Listbox.Label>
            <div className="relative w-64">
              <Listbox.Button className="focus-visible:ring-groovy-violet/20 inline-flex items-center ml-1 px-1 text-groovy-violet font-medium rounded focus:outline-none focus-visible:ring-2">
                {sorting}
                <CaretDown size={19} weight="bold" className="pl-1" />
              </Listbox.Button>
              <Listbox.Options className="absolute z-50 mt-1 p-2 w-full bg-white rounded-md focus:outline-none shadow-md sm:text-sm md:left-40">
                {sortOptions.map(({ name }) => (
                  <Listbox.Option
                    key={name}
                    value={name}
                    className={({ active }) =>
                      `${
                        active
                          ? 'text-groovy-violet bg-groovy-violet/10'
                          : 'text-gray-900'
                      }
                          select-none relative py-2 pl-10 pr-4 flex items-center rounded`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        {name}
                        {selected ? (
                          <span
                            className={`${
                              active
                                ? 'text-groovy-violet'
                                : 'text-groovy-violet'
                            } absolute inset-y-0 left-0 pl-3 flex items-center`}
                          >
                            <CheckCircle size={20} weight="regular" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {!filteredBooks.length && (
          <p className="my-10 font-medium">
            Sayang sekali buku yang kamu cari tidak ditemukan 😿
          </p>
        )}

        <div className="grid gap-7 grid-cols-1 pt-3 md:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard book={book} key={book.id} featured />
          ))}
        </div>
      </main>
    </Container>
  );
}

export async function getStaticProps() {
  const booksTable = await getBooksTable();

  const finished = booksTable.filter(({ status }) => status == 'Finished');

  return {
    props: {
      books: booksTable,
      finished,
    },
    revalidate: 10,
  };
}
