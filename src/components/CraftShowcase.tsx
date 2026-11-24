import { useEffect, useState } from 'react';
import { Expand, X } from 'lucide-react';
import { SHOWCASE_FRAMES, ShowcaseFrame } from '../data/studioData';
import { ResilientImage } from './ResilientImage';

export function CraftShowcase() {
  const [activeFrame, setActiveFrame] = useState<ShowcaseFrame | null>(null);

  useEffect(() => {
    if (!activeFrame) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveFrame(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFrame]);

  return (
    <section aria-labelledby="craft-heading" className="border-b border-[#E8DFD3] bg-[#F7F3ED] py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#B45309]">Signature Visual Craft</p>
            <h2
              id="craft-heading"
              className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#1E1E1E] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              From Golden-Hour Rituals to Grand Twilight Receptions
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#574B41]">
            Every celebration is filmed with multi-camera discipline—blending traditional family
            portraiture, aerial drone cinema, and unscripted candid laughter.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SHOWCASE_FRAMES.map((frame) => (
            <article
              key={frame.id}
              className="group overflow-hidden rounded-2xl border border-[#E5DACE] bg-white"
            >
              <button
                type="button"
                onClick={() => setActiveFrame(frame)}
                aria-label={`Inspect full frame: ${frame.title}`}
                className="relative block aspect-[4/3] w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
              >
                <ResilientImage
                  src={frame.src}
                  alt={frame.alt}
                  fallbackTitle={frame.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 via-black/20 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-lg bg-[#1F1711]/85 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors group-hover:bg-[#B45309]">
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>View Frame</span>
                </span>
              </button>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6B5E53]">
                  <span>{frame.ceremony}</span>
                  <span aria-hidden="true">·</span>
                  <span>{frame.location}</span>
                </div>
                <h3 className="mt-2 font-editorial text-xl font-semibold text-[#1E1E1E]">
                  {frame.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#574B41]">{frame.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeFrame && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#14100C]/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setActiveFrame(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#1D1610] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs text-[#E6B87A]">
                  {activeFrame.ceremony} · {activeFrame.location}
                </p>
                <h3 id="lightbox-title" className="font-editorial text-lg font-semibold text-white">
                  {activeFrame.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveFrame(null)}
                aria-label="Close lightbox preview"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="aspect-[4/3] w-full bg-black">
              <ResilientImage
                src={activeFrame.src}
                alt={activeFrame.alt}
                fallbackTitle={activeFrame.title}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="px-5 py-4 text-sm text-[#DED2C4]">{activeFrame.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
