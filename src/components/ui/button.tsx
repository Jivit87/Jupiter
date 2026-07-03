import { cloneElement, forwardRef, isValidElement } from 'react';
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const buttonStyles = {
  primary:
    'bg-amber-600 text-white shadow-sm hover:bg-amber-700 active:bg-amber-800 disabled:bg-amber-600/60',
  secondary:
    'bg-black text-white shadow-sm hover:bg-black/90 active:bg-black/80 disabled:bg-black/60',
  outline:
    'border border-[#E5E7EB] bg-transparent text-black hover:border-black active:bg-gray-50',
  ghost: 'bg-transparent text-black hover:bg-gray-100 active:bg-gray-200',
  whatsapp:
    'bg-[#25D366] text-white shadow-sm hover:bg-[#25D366]/90 active:bg-[#25D366]/80 disabled:bg-[#25D366]/60',
  destructive:
    'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800 disabled:bg-red-600/60',
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
      'inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors duration-200 ease-standard',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
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
