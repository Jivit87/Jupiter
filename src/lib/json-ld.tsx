import type { JsonLdGraph } from '@/types/seo';

type JsonLdProps = {
  data: JsonLdGraph;
};

export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function JsonLdCollection({ data }: { data: JsonLdGraph[] }) {
  return (
    <>
      {data.map((entry, index) => (
        <JsonLd key={index} data={entry} />
      ))}
    </>
  );
}
