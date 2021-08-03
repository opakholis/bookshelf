export default function Footer() {
  return (
    <footer className="mb-4 mt-8 px-4 w-full">
      <p className="text-center text-gray-500 text-sm">
        Sumber kode
        <a
          href="https://github.com/opxop/bookshelf"
          className="fancy-link mx-1 focus:outline-black"
        >
          Github
        </a>
        &#8226;
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.id"
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
