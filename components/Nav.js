import { Fragment, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';
import { MagnifyingGlass, X } from 'phosphor-react';

export default function Nav({ inputSearchBar }) {
  const ref = useRef();
  const router = useRouter();

  const isPageCollectionBooks = router.pathname === '/all';
  const [isInputMobile, setIsInputMobile] = useState(() => false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isInputMobile && ref.current && !ref.current.contains(e.target)) {
        setIsInputMobile(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // clean up eventListener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isInputMobile]);

  return (
    <nav className="z-50 mx-auto px-5 w-full md:px-6">
      <div className="flex items-center justify-between w-full h-20">
        <a href="#skip" className="skip-nav">
          Skip to content
        </a>
        <Link href="/" prefetch={false}>
          <a className="flex items-center focus:outline-none">
            <Image src="/static/images/logo.png" width={48} height={48} alt="Books" priority />
          </a>
        </Link>
        <section className="flex">
          {/* display seacrhbar only on page /all */}
          {isPageCollectionBooks && (
            <>
              <div className="relative hidden items-center mr-4 px-3 bg-white rounded-lg focus-within:ring-2 focus-within:ring-groovy-violet md:flex">
                <input
                  autoComplete="off"
                  aria-label="Cari buku"
                  placeholder="Cari buku..."
                  onChange={inputSearchBar}
                  className="pr-3 w-80 bg-transparent focus:outline-none appearance-none"
                />
                <MagnifyingGlass size={22} className="text-gray-400" />
              </div>

              {/* will only appear on mobile devices */}
              <button
                aria-label="Show searchbar"
                className="mr-2 p-4 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-groovy-violet md:hidden"
                onClick={() => setIsInputMobile(true)}
              >
                <MagnifyingGlass size={22} className="text-gray-400" />
              </button>
            </>
          )}
          <Link href="/all">
            <a
              role="button"
              className="bg-groovy-violet/90 focus:ring-white/50 px-9 py-4 text-white text-sm font-semibold hover:bg-groovy-violet rounded-lg focus:outline-none transition duration-300 focus:ring-2 md:px-16"
            >
              Koleksi Buku
            </a>
          </Link>
        </section>

        {/* will appear when clicking the search button */}
        <span ref={ref} className="absolute">
          <Transition
            as={Fragment}
            show={isInputMobile}
            enter="transition duration-500 ease-out"
            enterFrom="transform -translate-y-full"
            leave="transition duration-500 ease-out"
            leaveFrom="transform -translate-y-full"
            leaveTo="transform -translate-y-24"
          >
            <section className="fixed z-50 inset-0 flex items-center p-4 w-full h-24 bg-white">
              <div className="relative flex items-center p-4 w-full border border-gray-200 rounded-full">
                <input
                  autoComplete="off"
                  aria-label="Cari buku"
                  placeholder="Cari buku..."
                  onChange={inputSearchBar}
                  className="pr-2 w-full bg-transparent focus:outline-none appearance-none"
                />
                <MagnifyingGlass size={22} className="text-gray-400" />
              </div>
              <button
                aria-label="Hide searchbar"
                className="ml-2"
                onClick={() => setIsInputMobile(false)}
              >
                <X size={22} />
              </button>
            </section>
          </Transition>
        </span>
      </div>
    </nav>
  );
}
