import { useState, useRef } from 'react';

import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import LoadingSpinner from './icons/LoadingSpinner';

export default function FormSuggestion() {
  const inputEl = useRef(null);
  const [form, setForm] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setForm({ state: 'loading' });

    const res = await fetch('/api/send-suggestion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: inputEl.current.value })
    });

    if (res.status === 500) {
      setForm({
        state: 'error',
        message: 'Slow Down.. Kamu terdeteksi spam!'
      });
      return;
    }

    inputEl.current.value = '';
    setForm({
      state: 'success',
      message: 'Rekomendasimu berhasil disampaikan.'
    });
  };

  return (
    <div className="border-groovy-orange/30 bg-groovy-orange/10 p-4 w-full border rounded-md">
      <h3 className="mb-2.5 text-base">Punya rekomendasi buku? here we go</h3>
      <form
        onSubmit={submit}
        className="border-groovy-orange/20 focus-within:border-groovy-orange/50 relative flex my-1 p-2 bg-white border rounded-md"
      >
        <input
          id="title"
          type="text"
          ref={inputEl}
          autoComplete="off"
          aria-label="Rekomendasimu"
          placeholder="Rekomendasimu..."
          className="pr-2 w-full bg-transparent focus:outline-none appearance-none"
          required
        />
        <button
          type="submit"
          className="hover:bg-groovy-violet/90 focus:ring-groovy-violet/25 -mr-1 -my-1 py-1 w-24 text-white font-medium bg-groovy-violet rounded-md focus:outline-none transition duration-300 focus:ring"
        >
          {form.state === 'loading' ? <LoadingSpinner /> : 'Kirim'}
        </button>
      </form>
      {form.state === 'error' ? (
        <ErrorMessage>{form.message}</ErrorMessage>
      ) : form.state === 'success' ? (
        <SuccessMessage>{form.message}</SuccessMessage>
      ) : (
        <p className="text-gray-500 text-sm">*Judul buku - Penulis</p>
      )}
    </div>
  );
}
