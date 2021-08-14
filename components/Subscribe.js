import { useRef, useState } from 'react';

import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import LoadingSpinner from './icons/LoadingSpinner';

export default function Subscribe() {
  const inputEl = useRef(null);
  const [form, setForm] = useState(false);

  const subsribe = async (e) => {
    e.preventDefault();
    setForm({ state: 'loading' });

    const res = await fetch(`/api/subscribe`, {
      body: JSON.stringify({ email: inputEl.current.value }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: 'error',
        message:
          'Oppss, tampaknya terjadi kesalahan. Hubungi hi@opakholis.dev untuk dimasukkan ke daftar secara manual'
      });
      return;
    }

    inputEl.current.value = '';
    setForm({
      state: 'success',
      message: 'Hooray! Sekarang kamu dalam daftar Newsletter.'
    });
  };

  return (
    <div className="border-groovy-orange/30 bg-groovy-orange/10 p-4 w-full border rounded-md">
      <h3 className="mb-1 text-xl font-bold tracking-tight">
        Suka dengan tulisan ini?
      </h3>
      <p className="mb-2.5">
        Dapatkan email dari saya untuk informasi terkait tulisan dan buku yang
        saya baca.
      </p>
      <form
        onSubmit={subsribe}
        className="border-groovy-orange/20 focus-within:border-groovy-orange/50 relative flex my-1 p-2 bg-white border rounded-md"
      >
        <input
          ref={inputEl}
          type="email"
          autoComplete="email"
          aria-label="Email untuk berlangganan"
          placeholder="einstein@labs.com"
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
        <p className="text-gray-500 text-sm">
          Saya hanya akan mengirimkan email sekali di akhir bulan.
        </p>
      )}
    </div>
  );
}
