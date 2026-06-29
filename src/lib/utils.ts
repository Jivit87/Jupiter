import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatPrice(
  value: number,
  options: Intl.NumberFormatOptions & { locale?: string } = {},
) {
  const { locale = 'en-NP', ...formatOptions } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
    ...formatOptions,
  }).format(value);
}

export function formatDate(value: string | Date, locale = 'en-NP') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(typeof value === 'string' ? new Date(value) : value);
}

export function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
