import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';

import { List, X } from 'phosphor-react';
import { Fragment } from 'react';

export default function MobileMenuItem() {
  return (
    <Popover className="relative">
      <Popover.Button
        className="dark:hover:bg-gray-900/40 flex flex-col items-center justify-center w-24 h-12 text-xs hover:bg-gray-100 rounded-lg focus:outline-none"
        aria-label="Menu"
      >
        <List size={22} /> Menu
      </Popover.Button>

      <Popover.Overlay className="bg-black/20 fixed inset-0 w-full h-full" />

      <Transition
        as={Fragment}
        enter="transition duration-500 ease-out"
        enterFrom="transform translate-y-full"
        leave="transition duration-300 ease-out"
        leaveFrom="transform translate-y-full"
        leaveTo="transform translate-y-60"
      >
        <Popover.Panel className="fixed z-50 -bottom-2 inset-x-0">
          <div className="pb-6 pt-3 px-6 w-full dark:bg-gray-800 bg-white rounded-t-xl">
            <section className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-medium">Menu</h1>
              <Popover.Button
                className="dark:focus:ring-groovy-purple dark:hover:bg-gray-900/50 inline-flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Close"
              >
                <X size={18} weight="bold" />
              </Popover.Button>
            </section>
            <section className="flex flex-col space-y-2">
              <Link href="/" title="Beranda" />
              <Link href="/all" title="Selesai Dibaca" />
              <Link href="/bookmark" title="Bookmark" isDisabled />
            </section>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function Link({ href, title, isDisabled }) {
  let isActive = false;
  const { pathname } = useRouter();

  if (href === pathname) {
    isActive = true;
  }

  return (
    <NextLink href={href} passHref>
      <button
        className={`${isDisabled && 'text-gray-500'} ${isActive && 'font-bold'}
        dark:bg-gray-900/50 py-3 w-full bg-gray-100 rounded-lg focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-900/70 focus:ring`}
        disabled={isDisabled}
      >
        {title}
      </button>
    </NextLink>
  );
}
