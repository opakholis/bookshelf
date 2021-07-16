import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';

import { List, X } from 'phosphor-react';

export default function MobileMenuItem() {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center justify-center w-full focus:outline-none">
        <List size={22} />
      </Popover.Button>

      <Popover.Overlay className="bg-black/20 dur trayf trasfu trasy trasy fixed inset-0 w-screen h-screen" />

      <Transition
        enter="transition duration-500 linear"
        enterFrom="transform translate-y-60"
        enterTo="transform translate-y-full"
        leave="transition duration-300 linear"
        leaveFrom="transform translate-y-full"
        leaveTo="transform translate-y-60"
      >
        <Popover.Panel className="absolute z-10 -bottom-5 -left-full">
          <div className="pb-6 pt-3 px-6 w-screen dark:bg-gray-800 bg-white rounded-t-lg">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-medium">Menu</h1>
              <Popover.Button className="dark:focus-visible:ring-groovy-purple inline-flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
                <X size={20} weight="bold" />
              </Popover.Button>
            </div>
            <div className="flex flex-col space-y-2">
              <Link href="/" title="Beranda" />
              <Link href="/all" title="Selesai Dibaca" />
              <Link href="/bookmark" title="Bookmark" isDisabled />
            </div>
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
        dark:bg-gray-900/50 py-3 w-full  bg-gray-100 rounded-lg focus:outline-none`}
        disabled={isDisabled}
      >
        {title}
      </button>
    </NextLink>
  );
}
