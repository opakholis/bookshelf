import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  return (
    <nav className="z-50 mx-auto px-4 w-full md:px-6">
      <div className="flex items-center justify-between w-full h-20">
        <Link href="/" passHref>
          <a className="flex items-center">
            <Image src="/static/logo.png" width={40} height={40} alt="Book" />
          </a>
        </Link>
        <Link href="/all">
          <a className="bg-groovy-violet hover:bg-groovy-violet/80 focus:ring-groovy-violet px-9 py-3 text-white text-sm font-medium rounded-lg transition-all duration-300 focus:ring focus:ring-opacity-40 md:px-11">
            Koleksi Buku
          </a>
        </Link>
      </div>
    </nav>
  );
}
