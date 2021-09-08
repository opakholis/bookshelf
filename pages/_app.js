import '@/styles/globals.css';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#ac39fe" startPosition={0.3} stopDelayMs={200} height={3} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
