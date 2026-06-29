import { cloneElement, forwardRef, isValidElement } from 'react';
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const buttonStyles = {
  primary:
    'bg-brand text-starlight shadow-glow hover:bg-brand/90 active:bg-brand/85 disabled:bg-brand/60',
  secondary:
    'bg-primary text-starlight shadow-soft hover:bg-primary/95 active:bg-primary/90 disabled:bg-primary/60',
  outline:
    'border border-border bg-transparent text-text-primary hover:bg-surface active:bg-surface/80',
  ghost: 'bg-transparent text-text-primary hover:bg-surface active:bg-surface/80',
  whatsapp:
    'bg-[#25D366] text-white shadow-soft hover:bg-[#1fb85a] active:bg-[#1aa24f] disabled:bg-[#25D366]/60',
  destructive:
    'bg-copper text-starlight shadow-soft hover:bg-copper/90 active:bg-copper/85 disabled:bg-copper/60',
} as const;

const buttonSizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-11 w-11 p-0',
} as const;

export type ButtonVariant = keyof typeof buttonStyles;
export type ButtonSize = keyof typeof buttonSizes;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', asChild = false, children, ...props }, ref) => {
    const sharedClassName = cn(
      'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 ease-standard',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:pointer-events-none disabled:cursor-not-allowed',
      buttonStyles[variant],
      buttonSizes[size],
      className,
    );

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<{ className?: string }>;

      return cloneElement(child, {
        className: cn(child.props.className, sharedClassName),
      });
    }

    return (
      <button
        ref={ref}
        type={type}
        className={sharedClassName}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
