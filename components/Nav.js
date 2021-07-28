import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  return (
    <nav className="z-50 mx-auto px-4 w-full md:px-6">
      <div className="flex items-center justify-between w-full h-20">
        <Link href="/" passHref>
          <a className="flex items-center focus:outline-none">
            <Image src="/static/logo.png" width={40} height={40} alt="Book" />
          </a>
        </Link>
        <Link href="/all">
          <a className="bg-groovy-violet/90 px-9 py-3 text-white text-sm font-medium hover:bg-groovy-violet rounded-lg focus:outline-none transition duration-300 focus:ring focus:ring-groovy-purple md:px-11">
            Koleksi Buku
          </a>
        </Link>
      </div>
    </nav>
  );
}
