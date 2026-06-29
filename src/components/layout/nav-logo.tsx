import Link from 'next/link';

type NavLogoProps = {
  href?: string;
  className?: string;
};

export function NavLogo({ href = '/', className }: NavLogoProps) {
  return (
    <Link href={href} className={className ? className : 'group inline-flex items-center gap-3'}>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-starlight shadow-soft transition-transform duration-200 group-hover:-translate-y-0.5">
        <span className="font-display text-2xl leading-none">J</span>
      </span>
      <span className="flex flex-col">
        <span className="font-display text-2xl leading-none text-primary">Jupiter</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
          Made in Nepal
        </span>
      </span>
    </Link>
  );
}
