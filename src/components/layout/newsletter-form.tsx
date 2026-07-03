'use client';

export function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex overflow-hidden rounded-md border border-ivory/15"
    >
      <input
        type="email"
        placeholder="Your email address"
        aria-label="Email address for newsletter"
        className="flex-1 min-w-0 border-none bg-ivory/6 px-3.5 py-2.5 font-body text-base text-ivory outline-none placeholder:text-ivory/40 focus:bg-ivory/10"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex shrink-0 items-center justify-center min-h-[44px] border-none bg-gold px-3.5 py-2.5 text-ivory transition-colors duration-150 hover:bg-gold-light"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2 7h10M8 3l4 4-4 4" />
        </svg>
      </button>
    </form>
  );
}
