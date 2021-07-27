import { useState } from 'react';

export default function FormSuggestion() {
  const [title, setTitle] = useState('');

  const isEmpty = title === '';

  const submitForm = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/notion', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });

    // success if status code is 201
    if (res.status === 201) {
      setTitle('');
    }
  };
  return (
    <div className="border-groovy-orange/30 bg-groovy-orange/10 p-4 w-full border rounded-md">
      <h3 className="mb-2.5 text-sm md:text-base">
        Punya rekomendasi buku? here we go
      </h3>
      <form onSubmit={submitForm} className="relative flex">
        <input
          id="title"
          type="text"
          placeholder="Judul buku - Penulis"
          className="border-groovy-orange/20 focus:border-groovy-orange/50 pl-4 pr-28 py-1.5 w-full text-sm bg-white border rounded-md focus:outline-none"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
        />
        <button
          type="submit"
          className={`absolute right-3.5 top-[3px] bg-groovy-violet -mr-2.5 py-0.5 w-24 text-white font-medium rounded ${
            isEmpty && 'cursor-default opacity-50'
          }`}
          disabled={isEmpty}
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
