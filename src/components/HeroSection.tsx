import { ArrowDownRight, ArrowRight, Phone } from 'lucide-react';
import { PackageId, STUDIO_CONTACTS, STUDIO_IMAGES } from '../data/studioData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onSelectOfferPackage: (packageId: PackageId) => void;
}

export function HeroSection({ onSelectOfferPackage }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#E8DFD3] bg-[#FDF9F3]"
    >
      <div className="mx-auto max-w-[1280px] px-5 pt-7 pb-10 sm:px-8 md:pt-14 md:pb-16 lg:pt-16 lg:pb-20">
        {/* 2-column balanced editorial split */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial typography & primary actions */}
          <div className="flex flex-col justify-between lg:col-span-7 lg:py-4">
            <div>
              <p className="font-editorial text-base italic text-[#B45309] sm:text-lg">
                Visit our Mahak Studio to book your wedding
              </p>

              <h1
                className="mt-3 max-w-2xl font-editorial font-semibold tracking-tight text-[#1E1E1E] sm:mt-4"
                style={{
                  fontSize: 'clamp(2.15rem, 4.3vw, 3.85rem)',
                  lineHeight: 1.08,
                  textWrap: 'balance',
                }}
              >
                Capture Your Big Day with Mahak Studio
              </h1>

              <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-[#4A3F36] sm:mt-6 sm:text-lg sm:leading-[1.68]">
                Timeless wedding photography and cinematic storytelling crafted with warmth,
                candid emotion, and vibrant Indian celebration. From intimate rituals to grand
                receptions in Indore, we preserve every memory.
              </p>

              {/* Primary + Secondary CTAs */}
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
                <a
                  href="#packages"
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#B45309] px-7 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#92400E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
                >
                  <span>Explore Packages</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href={STUDIO_CONTACTS.raja.telHref}
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#D8CBB8] bg-white px-6 py-3 text-sm font-semibold text-[#2D251E] tabular-nums transition-colors duration-150 hover:border-[#B45309] hover:bg-[#FAF5ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
                >
                  <Phone className="h-4 w-4 text-[#B45309]" aria-hidden="true" />
                  <span>Call Raja Dangi: {STUDIO_CONTACTS.raja.rawPhone}</span>
                </a>
              </div>
            </div>

            {/* Quiet studio provenance strip anchoring the bottom of the left column (desktop) */}
            <div className="mt-8 hidden border-t border-[#E8DFD3] pt-6 sm:block lg:mt-10">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-[#6B5E53]">Home Studio</p>
                  <p className="mt-1 text-sm font-semibold text-[#2D251E]">
                    {STUDIO_CONTACTS.city}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#6B5E53]">Couples Documented</p>
                  <p className="mt-1 text-sm font-semibold text-[#2D251E] tabular-nums">
                    150+ Weddings · 4.9 ★ Rated
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#6B5E53]">Direct WhatsApp</p>
                  <a
                    href={STUDIO_CONTACTS.raja.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#B45309] underline-offset-4 hover:underline"
                  >
                    <span>Message Raja Dangi</span>
                    <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-res portrait showcase with anchored Special Offer overlay */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-2xl border border-[#E5DACE] bg-[#F3EADF] sm:min-h-[500px] lg:min-h-[540px]">
              <ResilientImage
                src={STUDIO_IMAGES.heroCouple}
                alt="Joyful Indian wedding couple in marigold and crimson attire laughing candidly during a golden-hour Haldi celebration captured by Mahak Studio"
                fallbackTitle="Mahak Studio · Golden Hour Haldi Portrait"
                loading="eager"
                className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
              />

              {/* Measured bottom contrast scrim for >= 4.5:1 text legibility */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#1A130D]/90 via-[#1A130D]/45 to-transparent"
                aria-hidden="true"
              />

              {/* Anchored Special Offer Card */}
              <div className="absolute inset-x-3.5 bottom-3.5 sm:inset-x-5 sm:bottom-5">
                <div className="flex flex-col gap-3 rounded-xl border border-white/15 bg-[#1B130D]/92 p-4 text-white backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide text-[#FCD34D]">
                      <span className="text-[#FCA5A5]">Special Offer</span>
                      <span aria-hidden="true" className="mx-1.5 text-white/40">
                        ·
                      </span>
                      <span>Most Popular</span>
                    </p>
                    <p className="mt-0.5 font-editorial text-lg font-semibold leading-snug text-white tabular-nums">
                      Premium Package at ₹60,000/-
                    </p>
                    <p className="mt-0.5 text-xs text-[#E7DDD1]">
                      Candid · Cinematic · Drone · 3 Reels · 2 Albums
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectOfferPackage('premium')}
                    className="inline-flex min-h-[42px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#D98218] px-4 py-2 text-xs font-semibold text-[#1A130D] transition-colors duration-150 hover:bg-[#EA9429] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Book Premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Trust Strip below the split — clean unboxed metadata with typographic separators */}
        <div className="mt-10 border-t border-[#E8DFD3] pt-6">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm font-medium text-[#4A3F36]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span>4 Curated Tiers</span>
              <span aria-hidden="true" className="text-[#C7B8A6]">
                ·
              </span>
              <span>4K &amp; Drone Coverage</span>
              <span aria-hidden="true" className="text-[#C7B8A6]">
                ·
              </span>
              <span>MK Cinematic Teasers &amp; Reels</span>
            </div>
            <p className="text-xs text-[#6B5E53]">
              Serving {STUDIO_CONTACTS.serviceAreas}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
