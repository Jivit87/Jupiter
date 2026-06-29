import Link from 'next/link';
import Image from 'next/image';
import type { Category } from '@/types';
import { SectionFrame } from './section-frame';
import { getCatalogCategories } from '@/lib/catalog';

type CategoryGridProps = {
  categories?: Category[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  const display = getCatalogCategories(categories);

  return (
    <SectionFrame
      eyebrow="Shop By Category"
      title="Explore our universe"
      description="Every piece is handcrafted in Nepal with intention and love."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {display.map((category) => (
          <Link
            key={category.slug}
            href={`/collections/${category.slug}`}
            className="group relative block overflow-hidden rounded-2xl bg-primary"
            style={{ minHeight: '220px' }}
          >
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#3b2a6e] to-[#6b4e9b]" />
            )}

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent" />

            {/* gold ring on hover */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-brand/50" />

            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <span className="mb-1 text-lg leading-none">{category.emoji}</span>
              <h3 className="font-heading text-xl leading-snug text-starlight group-hover:text-brand transition-colors duration-300">
                {category.name}
              </h3>
              <p className="mt-1 text-xs leading-5 text-starlight/55 line-clamp-2">
                {category.description}
              </p>
              <span className="mt-3 inline-block text-xs font-medium text-brand opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </SectionFrame>
  );
}
