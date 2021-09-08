import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from './Footer';

import Nav from './Nav';

export default function Container({ searchBar, children, ...customMeta }) {
  const router = useRouter();
  const meta = {
    title: 'Buku - Opa Kholis Majid',
    description: `Sedang membaca buku apa hari ini?`,
    url: 'https://books.opakholis.dev',
    image: 'https://books.opakholis.dev/static/images/og.jpg',
    type: 'website',
    ...customMeta
  };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`${meta.url}${router.asPath}`} />
        <link rel="canonical" href={`${meta.url}${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Opa Kholis Majid" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@opakholis" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />

        {meta.date && <meta property="article:published_time" content={meta.date} />}
      </Head>
      <Nav inputSearchBar={searchBar} />
      <section id="skip" className="relative w-full">
        {children}
      </section>
      <Footer />
    </>
  );
}
