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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {display.map((category) => (
          <Link
            key={category.slug}
            href={`/collections/${category.slug}`}
            className="group relative block overflow-hidden rounded-sm bg-white border border-[#E5E7EB] hover:border-black transition-colors duration-300"
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
              <div className="absolute inset-0 bg-[#F9FAFB]" />
            )}

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <span className="mb-2 text-xl leading-none text-white"><i className={category.icon}></i></span>
              <h3 className="font-sans font-semibold text-lg leading-snug text-white">
                {category.name}
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-300 line-clamp-2">
                {category.description}
              </p>
              <span className="mt-3 inline-block text-[10px] uppercase font-bold tracking-widest text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Explore <i className="ri-arrow-right-line"></i>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </SectionFrame>
  );
}
