import { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { STUDIO_CONTACTS } from '../data/studioData';

const NAV_LINKS = [
  { label: 'Packages', href: '#packages' },
  { label: 'Compare Plans', href: '#compare' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'About MK Cinematic', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export function ShutterEmblem({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 2L20.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M28.1 9L19.5 14.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M28.1 23L17.8 20.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 30L11.5 20.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3.9 23L12.5 17.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3.9 9L14.2 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E8DFD3] bg-[#FDF9F3]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Single-line serif wordmark with subtle shutter motif */}
        <a
          href="#top"
          className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[#2D251E] transition-colors hover:text-[#B45309] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B45309]"
        >
          <ShutterEmblem className="h-6 w-6 text-[#B45309]" />
          <span className="font-editorial text-xl font-semibold tracking-tight sm:text-2xl">
            Mahak Studio
          </span>
        </a>

        {/* Zone 2: 5 concise single-line text links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap border-b border-transparent py-1 text-sm font-medium text-[#4A3F36] transition-colors duration-150 hover:border-[#D98218] hover:text-[#1E1E1E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B45309]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA button + mobile menu trigger */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={STUDIO_CONTACTS.raja.telHref}
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#B45309] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#92400E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309] sm:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>Book Your Wedding</span>
          </a>

          <a
            href={STUDIO_CONTACTS.raja.telHref}
            aria-label="Call Mahak Studio to book your wedding"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#B45309] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#92400E] sm:hidden"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Book Now</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#E5DACE] text-[#2D251E] transition-colors hover:bg-[#F7F3ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309] lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-t border-[#E8DFD3] bg-[#FDF9F3] px-5 py-4 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-[#2D251E] transition-colors hover:bg-[#F7F3ED] hover:text-[#B45309]"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 border-t border-[#E8DFD3] pt-3">
              <a
                href={STUDIO_CONTACTS.raja.telHref}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#B45309] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#92400E]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Book Your Wedding · {STUDIO_CONTACTS.raja.rawPhone}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
