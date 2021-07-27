import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  return (
    <nav className="z-50 mx-auto px-6 w-full">
      <div className="flex items-center justify-between w-full h-20">
        <Link href="/" passHref>
          <a>
            <Image src="/static/logo.png" width={40} height={40} alt="Book" />
          </a>
        </Link>
        <Link href="/all">
          <a className="bg-groovy-violet px-12 py-3.5 text-white rounded-lg">
            Koleksi Buku
          </a>
        </Link>
      </div>
    </nav>
  );
}
