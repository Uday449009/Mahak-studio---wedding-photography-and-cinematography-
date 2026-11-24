import { ArrowRight, Check } from 'lucide-react';
import { PackageId, WEDDING_PACKAGES, WeddingPackage } from '../data/studioData';

interface PackagesSectionProps {
  selectedPackageId: PackageId;
  onSelectPackage: (packageId: PackageId) => void;
}

export function PackagesSection({
  selectedPackageId,
  onSelectPackage,
}: PackagesSectionProps) {
  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="scroll-mt-20 border-b border-[#E8DFD3] bg-[#FDF9F3] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#B45309]">Curated Wedding Collections</p>
            <h2
              id="packages-heading"
              className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#1E1E1E] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Four Transparent Tiers Built for Every Celebration
            </h2>
          </div>
          <a
            href="#compare"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-[#B45309] underline-offset-4 hover:underline"
          >
            <span>Compare all deliverables side by side</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {WEDDING_PACKAGES.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              isSelected={selectedPackageId === pkg.id}
              onSelect={() => onSelectPackage(pkg.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PackageCardProps {
  pkg: WeddingPackage;
  isSelected: boolean;
  onSelect: () => void;
}

function PackageCard({ pkg, isSelected, onSelect }: PackageCardProps) {
  const isRoyal = Boolean(pkg.isRoyal);
  const isFeatured = Boolean(pkg.isFeatured);

  const cardSurface = isRoyal
    ? 'border-[#3E3228] bg-[#2D251E] text-[#FAF6F0]'
    : isFeatured
      ? 'border-[#B45309] bg-white text-[#1E1E1E] shadow-[0_14px_36px_-18px_rgba(180,83,9,0.28)]'
      : 'border-[#E5DACE] bg-white text-[#1E1E1E]';

  const kickerText = isFeatured
    ? 'text-[#DC2626]'
    : isRoyal
      ? 'text-[#F5B041]'
      : 'text-[#6B5E53]';

  const mutedText = isRoyal ? 'text-[#D6C8B8]' : 'text-[#574B41]';
  const dividerColor = isRoyal ? 'border-[#46392E]' : 'border-[#EDE4D8]';
  const checkIconColor = isRoyal ? 'text-[#F5B041]' : 'text-[#B45309]';

  const ctaStyles = isFeatured
    ? 'bg-[#B45309] text-white hover:bg-[#92400E]'
    : isRoyal
      ? 'bg-[#D98218] text-[#1E1813] hover:bg-[#EA9429]'
      : 'border border-[#D8CBB8] bg-[#FAF6EF] text-[#2D251E] hover:border-[#B45309] hover:bg-[#F4EBDD]';

  return (
    <article
      data-testid={`package-card-${pkg.id}`}
      className={`flex flex-col justify-between rounded-2xl border p-6 transition-transform duration-200 hover:-translate-y-0.5 ${cardSurface}`}
    >
      <div>
        {/* Clean single-line editorial kicker (zero pill sandwiches) */}
        <p className={`text-xs font-semibold tracking-wide ${kickerText}`}>
          {pkg.highlightLabel ?? 'Wedding Collection'}
        </p>

        <div className="mt-3 flex items-baseline justify-between gap-2">
          <h3 className="font-editorial text-2xl font-semibold tracking-tight">{pkg.name}</h3>
          {isSelected && (
            <span
              className={`text-xs font-semibold ${
                isRoyal ? 'text-[#F5B041]' : 'text-[#B45309]'
              }`}
            >
              Selected
            </span>
          )}
        </div>

        <p className="mt-2 font-editorial text-3xl font-semibold tracking-tight tabular-nums">
          {pkg.priceLabel}
        </p>

        <p className={`mt-2.5 text-sm leading-relaxed ${mutedText}`}>{pkg.tagline}</p>

        <div className={`my-5 border-t ${dividerColor}`} />

        <ul className="space-y-2.5 text-sm leading-snug">
          {pkg.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                className={`mt-0.5 h-4 w-4 shrink-0 ${checkIconColor}`}
                aria-hidden="true"
              />
              <span className={isRoyal ? 'text-[#F5EFE6]' : 'text-[#2D251E]'}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 pt-2">
        <button
          type="button"
          onClick={onSelect}
          className={`inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309] ${ctaStyles}`}
        >
          <span>Select {pkg.name}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
