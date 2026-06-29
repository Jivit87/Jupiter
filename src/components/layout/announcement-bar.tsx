import { cn } from '@/lib/utils';

type AnnouncementBarProps = {
  text?: string;
  className?: string;
};

export function AnnouncementBar({
  text = 'Free shipping on orders above NPR 1500 within Kathmandu Valley',
  className,
}: AnnouncementBarProps) {
  return (
    <div
      className={cn(
        'border-b border-primary/10 bg-brand text-primary',
        'px-4 py-2 text-center font-mono text-[11px] uppercase tracking-[0.28em] sm:text-xs',
        className,
      )}
    >
      <p className="text-balance">{text}</p>
    </div>
  );
}
