import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SEO() {
  const router = useRouter();
  const meta = {
    title: 'Buku - Opa Kholis Majid',
    description: 'Sedang membaca buku apa hari ini?',
    url: 'https://books.opakholis.dev',
    image: 'https://books.opakholis.dev/static/images/og.jpg',
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${meta.url}${router.asPath}`} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:site_name" content="Opa Kholis Majid" />
      <meta property="og:description" content={meta.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@opakholis" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <link rel="canonical" href={`${meta.url}${router.asPath}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}
