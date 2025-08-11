/** @returns {Record<string, any>} */
export function personJsonLd({ name, url, sameAs = [] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name, url, sameAs
  };
}