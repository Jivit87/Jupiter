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
        'w-full border-b text-center font-sans uppercase tracking-[0.28em]',
        className,
      )}
      style={{
        backgroundColor: 'rgb(30 23 64)',
        color: 'rgb(200 148 48)',
        fontSize: '9px',
        padding: '11px 16px',
        letterSpacing: '0.3em',
        height: '31px',
      }}
    >
      <p className="text-balance">{text}</p>
    </div>
  );
}
