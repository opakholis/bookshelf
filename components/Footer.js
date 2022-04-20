export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center mb-12 mt-8 px-4 w-full space-y-2">
      <p className="text-center text-gray-500 text-xs font-semibold tracking-wider uppercase">
        Made with
        <span className="px-1">🍔</span>
        in
        <span className="px-1">🇮🇩</span>
      </p>
      <p className="text-center text-gray-500 text-sm">
        Source Code
        <a
          href="https://github.com/opakholis/bookshelf"
          className="fancy-link mx-1 focus:outline-black"
        >
          Github
        </a>
        &#8226;
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="fancy-link mx-1 focus:outline-black"
        >
          CC BY-NC-SA 4.0
        </a>
      </p>
    </footer>
  );
}
