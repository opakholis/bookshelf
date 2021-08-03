import Link from 'next/link';
import { useRouter } from 'next/router';

import Container from '@/components/Container';
import Meow from '@/components/icons/Meow';

export default function NotFound() {
  const { asPath } = useRouter();

  return (
    <Container
      title="Whoops... 404 Not Found"
      description="Halaman yang kamu cari tidak ditemukan :("
    >
      <main className="relative z-40 m-auto p-6 w-full max-w-screen-md h-full bg-white rounded-xl md:mt-10">
        <div className="flex flex-col items-center justify-center leading-7 space-y-3">
          <Meow className="w-72 md:w-80" />
          <p>
            Halaman
            <code className="mx-1 p-0.5 text-gray-800 bg-gray-100 rounded select-none">
              {asPath}
            </code>
            tidak ditemukan
          </p>
          <Link href="/">
            <a className="fancy-link">Kembali ke Home</a>
          </Link>
        </div>
      </main>
    </Container>
  );
}
