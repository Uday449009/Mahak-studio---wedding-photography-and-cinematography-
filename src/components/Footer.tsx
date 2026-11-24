import { Instagram, MessageCircle, Phone } from 'lucide-react';
import { STUDIO_CONTACTS } from '../data/studioData';
import { ShutterEmblem } from './Header';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1E1813] text-[#E6DACB]">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <a href="#top" className="inline-flex items-center gap-2.5 text-white">
              <ShutterEmblem className="h-6 w-6 text-[#D98218]" />
              <span className="font-editorial text-2xl font-semibold tracking-tight">
                Mahak Studio
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#BFB09F]">
              Indian wedding photography and cinematography crafted in {STUDIO_CONTACTS.city}.
              Preserving Haldi, Sangeet, Pheras, and grand receptions across {STUDIO_CONTACTS.serviceAreas}.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="font-sans text-xs font-semibold tracking-wider text-[#F5B041] uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#packages" className="text-[#E6DACB] transition-colors hover:text-white">
                  Wedding Packages
                </a>
              </li>
              <li>
                <a href="#compare" className="text-[#E6DACB] transition-colors hover:text-white">
                  Compare Plans
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-[#E6DACB] transition-colors hover:text-white">
                  Couple Reviews
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#E6DACB] transition-colors hover:text-white">
                  About MK Cinematic
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#E6DACB] transition-colors hover:text-white">
                  Book Your Wedding
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contacts & Social */}
          <div className="md:col-span-4">
            <h3 className="font-sans text-xs font-semibold tracking-wider text-[#F5B041] uppercase">
              Studio Contacts
            </h3>
            <ul className="mt-4 space-y-3 text-sm tabular-nums">
              <li>
                <a
                  href={STUDIO_CONTACTS.raja.telHref}
                  className="inline-flex items-center gap-2 text-[#E6DACB] transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[#D98218]" aria-hidden="true" />
                  <span>
                    {STUDIO_CONTACTS.raja.name}: {STUDIO_CONTACTS.raja.displayPhone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_CONTACTS.om.telHref}
                  className="inline-flex items-center gap-2 text-[#E6DACB] transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[#D98218]" aria-hidden="true" />
                  <span>
                    {STUDIO_CONTACTS.om.name}: {STUDIO_CONTACTS.om.displayPhone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_CONTACTS.raja.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#E6DACB] transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 text-[#D98218]" aria-hidden="true" />
                  <span>WhatsApp Booking Desk</span>
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_CONTACTS.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#E6DACB] transition-colors hover:text-white"
                >
                  <Instagram className="h-4 w-4 text-[#D98218]" aria-hidden="true" />
                  <span>Instagram: {STUDIO_CONTACTS.instagram.handle}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#9E8F7E] sm:flex-row sm:items-center">
          <p>© {year} Mahak Studio · Photography &amp; Cinematography, Indore. All rights reserved.</p>
          <p>Lead Cinematography by MK Cinematic</p>
        </div>
      </div>
    </footer>
  );
}
