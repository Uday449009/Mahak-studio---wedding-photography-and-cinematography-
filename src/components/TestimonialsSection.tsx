import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/studioData';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-20 border-b border-[#E8DFD3] bg-[#FDF9F3] py-16 sm:py-22"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#B45309]">Loved Across Malwa</p>
            <h2
              id="testimonials-heading"
              className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#1E1E1E] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Stories from Couples in Indore, Ujjain &amp; Dewas
            </h2>
          </div>

          {/* Clean Rating Summary */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center gap-1.5 text-[#D98218]" aria-label="4.9 out of 5 stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
              ))}
              <span className="ml-1.5 font-editorial text-2xl font-semibold text-[#1E1E1E] tabular-nums">
                4.9
              </span>
            </div>
            <p className="mt-1 text-sm text-[#574B41] tabular-nums">
              Based on 150+ happy couples across Indore, Ujjain &amp; Dewas
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-[#E5DACE] bg-white p-7"
            >
              <div>
                <p className="text-xs font-semibold text-[#B45309]">{item.highlight}</p>
                <blockquote className="mt-4 text-sm leading-[1.7] text-[#2D251E] sm:text-[15px]">
                  “{item.quote}”
                </blockquote>
              </div>

              <figcaption className="mt-6 border-t border-[#EDE4D8] pt-4">
                <p className="font-editorial text-lg font-semibold text-[#1E1E1E]">
                  {item.couple}
                </p>
                <p className="mt-0.5 text-xs text-[#6B5E53]">
                  <span>{item.city}</span>
                  <span aria-hidden="true" className="mx-1.5">
                    ·
                  </span>
                  <span>{item.packageUsed}</span>
                  <span aria-hidden="true" className="mx-1.5">
                    ·
                  </span>
                  <span>{item.weddingDate}</span>
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
