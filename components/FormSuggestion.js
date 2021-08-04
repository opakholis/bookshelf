import { CheckCircle, XCircle } from 'phosphor-react';
import { useState } from 'react';

import Spinner from './icons/Spinner';

export default function FormSuggestion() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEmpty = title === '';

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch('/api/notion', {
      method: 'POST',
      body: JSON.stringify({ title })
    });

    // success if status code is 201
    if (res.status === 201) {
      setIsLoading(false);
      setTitle('');
      setMessage(
        <div className="text-groovy-green/90 flex items-center">
          <CheckCircle size={18} weight="fill" />
          <p className="ml-1">Hooray! Sekarang kembali kerja</p>
        </div>
      );
    } else {
      setTitle('');
      setMessage(
        <div className="flex items-center text-groovy-red">
          <XCircle size={18} weight="fill" />
          <p className="ml-1">Hmmm.. Sepertinya terjadi kesalahan</p>
        </div>
      );
    }
  };
  return (
    <div className="border-groovy-orange/30 bg-groovy-orange/10 p-4 w-full border rounded-md">
      <h3 className="mb-2.5 text-base">Punya rekomendasi buku? here we go</h3>
      <form onSubmit={submitForm} className="relative flex">
        <input
          id="title"
          type="text"
          aria-label="Rekomendasimu"
          placeholder="Rekomendasimu..."
          className="border-groovy-orange/20 focus:border-groovy-orange/50 pl-4 pr-28 py-2 w-full bg-white border rounded-md focus:outline-none"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          autoComplete="off"
          required
        />
        <button
          type="submit"
          className={`absolute right-0 inset-y-0 bg-groovy-violet py-1 w-24 text-white font-medium rounded-md focus:outline-none hover:bg-groovy-violet focus:ring-1 transition duration-300 focus:ring-offset-groovy-purple ${
            isEmpty && 'cursor-not-allowed opacity-50'
          }`}
          disabled={isEmpty}
        >
          {isLoading ? <Spinner /> : 'Kirim'}
        </button>
      </form>
      <section className="mt-2.5 text-gray-500 text-sm font-medium">
        {!message ? <p>*Judul Buku - Penulis</p> : message}
      </section>
    </div>
  );
}
