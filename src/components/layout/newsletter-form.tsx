'use client';

export function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: 'flex',
        border: '1px solid rgba(253,250,245,0.15)',
        overflow: 'hidden',
        borderRadius: '6px',
      }}
    >
      <input
        type="email"
        placeholder="Your email address"
        aria-label="Email address for newsletter"
        style={{
          flex: 1,
          minWidth: 0,
          backgroundColor: 'rgba(253,250,245,0.06)',
          padding: '11px 14px',
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: '#FDFAF5',
          outline: 'none',
          border: 'none',
        }}
        onFocus={(e) => {
          (e.target as HTMLInputElement).style.backgroundColor = 'rgba(253,250,245,0.1)';
        }}
        onBlur={(e) => {
          (e.target as HTMLInputElement).style.backgroundColor = 'rgba(253,250,245,0.06)';
        }}
      />
      <button
        type="submit"
        aria-label="Subscribe"
        style={{
          flexShrink: 0,
          backgroundColor: '#C89430',
          color: '#FDFAF5',
          padding: '11px 14px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.15s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D9A852';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#C89430';
        }}
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
