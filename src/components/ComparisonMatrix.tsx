import { useState } from 'react';
import { Check, Minus } from 'lucide-react';
import {
  COMPARISON_ROWS,
  PackageId,
  WEDDING_PACKAGES,
} from '../data/studioData';
import { filterComparisonRows } from '../utils/booking';

interface ComparisonMatrixProps {
  selectedPackageId: PackageId;
  onSelectPackage: (packageId: PackageId) => void;
}

export function ComparisonMatrix({
  selectedPackageId,
  onSelectPackage,
}: ComparisonMatrixProps) {
  const [upgradesOnly, setUpgradesOnly] = useState(false);
  const [mobileFocusTier, setMobileFocusTier] = useState<PackageId>('premium');

  const visibleRows = filterComparisonRows(COMPARISON_ROWS, upgradesOnly);
  const focusedPkg =
    WEDDING_PACKAGES.find((p) => p.id === mobileFocusTier) ?? WEDDING_PACKAGES[2];

  return (
    <section
      id="compare"
      aria-labelledby="compare-heading"
      className="scroll-mt-20 border-b border-[#E8DFD3] bg-[#F7F3ED] py-16 sm:py-22"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#B45309]">Side-by-Side Comparison</p>
            <h2
              id="compare-heading"
              className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#1E1E1E] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Compare Every Deliverable Across All Four Plans
            </h2>
          </div>

          {/* Interactive segmented filter control */}
          <div
            role="group"
            aria-label="Filter comparison deliverables"
            className="inline-flex w-fit items-center gap-1 rounded-lg border border-[#E5DACE] bg-white p-1"
          >
            <button
              type="button"
              onClick={() => setUpgradesOnly(false)}
              aria-pressed={!upgradesOnly}
              className={`min-h-[38px] shrink-0 whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                !upgradesOnly
                  ? 'bg-[#2D251E] text-white'
                  : 'text-[#574B41] hover:text-[#1E1E1E]'
              }`}
            >
              All Deliverables (6)
            </button>
            <button
              type="button"
              onClick={() => setUpgradesOnly(true)}
              aria-pressed={upgradesOnly}
              className={`min-h-[38px] shrink-0 whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                upgradesOnly
                  ? 'bg-[#2D251E] text-white'
                  : 'text-[#574B41] hover:text-[#1E1E1E]'
              }`}
            >
              Premium &amp; Royal Upgrades (3)
            </button>
          </div>
        </div>

        {/* Desktop & Tablet Responsive Table */}
        <div className="mt-10 hidden overflow-x-auto rounded-2xl border border-[#E5DACE] bg-white md:block">
          <table className="w-full min-w-[780px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E8DFD3] bg-[#FAF6EF]">
                <th
                  scope="col"
                  className="w-[24%] px-6 py-5 text-xs font-semibold tracking-wide text-[#574B41]"
                >
                  Deliverable Category
                </th>
                {WEDDING_PACKAGES.map((pkg) => (
                  <th
                    key={pkg.id}
                    scope="col"
                    className={`w-[19%] px-5 py-5 align-top ${
                      pkg.isFeatured ? 'bg-[#FDF4E7]' : ''
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-editorial text-lg font-semibold text-[#1E1E1E]">
                        {pkg.name}
                      </span>
                      <span className="text-sm font-semibold text-[#B45309] tabular-nums">
                        {pkg.priceLabel}
                      </span>
                      {pkg.isFeatured && (
                        <span className="text-[11px] font-semibold text-[#DC2626]">
                          Special Offer
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE4D8]">
              {visibleRows.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-[#FCF9F4]">
                  <th scope="row" className="px-6 py-5 align-top font-normal">
                    <p className="text-sm font-semibold text-[#1E1E1E]">{row.category}</p>
                    <p className="mt-1 text-xs text-[#6B5E53]">{row.detailHint}</p>
                  </th>
                  {WEDDING_PACKAGES.map((pkg) => {
                    const cell = row.values[pkg.id];
                    const isNotIncluded = cell.included === 'no';
                    return (
                      <td
                        key={pkg.id}
                        className={`px-5 py-5 align-top text-sm leading-snug tabular-nums ${
                          pkg.isFeatured ? 'bg-[#FDF9F1]' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {isNotIncluded ? (
                            <Minus
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#A89A8B]"
                              aria-hidden="true"
                            />
                          ) : (
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#B45309]"
                              aria-hidden="true"
                            />
                          )}
                          <span
                            className={
                              isNotIncluded ? 'text-[#7C6F63]' : 'font-medium text-[#2D251E]'
                            }
                          >
                            {cell.text}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-[#E8DFD3] bg-[#FAF6EF]">
                <td className="px-6 py-4 text-xs font-medium text-[#6B5E53]">
                  Ready to reserve your dates?
                </td>
                {WEDDING_PACKAGES.map((pkg) => (
                  <td
                    key={pkg.id}
                    className={`px-5 py-4 ${pkg.isFeatured ? 'bg-[#FDF4E7]' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectPackage(pkg.id)}
                      className={`inline-flex min-h-[40px] w-full items-center justify-center whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                        selectedPackageId === pkg.id
                          ? 'bg-[#2D251E] text-white'
                          : pkg.isFeatured
                            ? 'bg-[#B45309] text-white hover:bg-[#92400E]'
                            : 'border border-[#D8CBB8] bg-white text-[#2D251E] hover:border-[#B45309]'
                      }`}
                    >
                      {selectedPackageId === pkg.id ? `${pkg.name} Selected` : `Choose ${pkg.name}`}
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Tier Switcher Comparison View (Zero Horizontal Clipped Text) */}
        <div className="mt-8 md:hidden">
          <div
            role="tablist"
            aria-label="Select a wedding tier to inspect deliverables"
            className="grid grid-cols-2 gap-2"
          >
            {WEDDING_PACKAGES.map((pkg) => {
              const active = mobileFocusTier === pkg.id;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMobileFocusTier(pkg.id)}
                  className={`flex min-h-[48px] flex-col items-start justify-center rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
                    active
                      ? 'border-[#B45309] bg-[#2D251E] text-white'
                      : 'border-[#E5DACE] bg-white text-[#2D251E]'
                  }`}
                >
                  <span className="font-editorial text-base font-semibold">{pkg.name}</span>
                  <span
                    className={`text-xs font-semibold tabular-nums ${
                      active ? 'text-[#F5B041]' : 'text-[#B45309]'
                    }`}
                  >
                    {pkg.priceLabel}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            className="mt-4 overflow-hidden rounded-2xl border border-[#E5DACE] bg-white"
          >
            <div className="flex items-center justify-between border-b border-[#EDE4D8] bg-[#FAF6EF] px-5 py-4">
              <div>
                <h3 className="font-editorial text-xl font-semibold text-[#1E1E1E]">
                  {focusedPkg.name} Plan
                </h3>
                <p className="text-xs text-[#6B5E53] tabular-nums">{focusedPkg.priceLabel}</p>
              </div>
              <button
                type="button"
                onClick={() => onSelectPackage(focusedPkg.id)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#B45309] px-4 py-2 text-xs font-semibold text-white"
              >
                Choose {focusedPkg.name}
              </button>
            </div>
            <dl className="divide-y divide-[#EDE4D8]">
              {visibleRows.map((row) => {
                const cell = row.values[focusedPkg.id];
                const isNotIncluded = cell.included === 'no';
                return (
                  <div key={row.id} className="px-5 py-4">
                    <dt className="text-xs font-semibold text-[#6B5E53]">{row.category}</dt>
                    <dd className="mt-1.5 flex items-start gap-2 text-sm tabular-nums">
                      {isNotIncluded ? (
                        <Minus
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#A89A8B]"
                          aria-hidden="true"
                        />
                      ) : (
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#B45309]"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={
                          isNotIncluded ? 'text-[#7C6F63]' : 'font-medium text-[#2D251E]'
                        }
                      >
                        {cell.text}
                      </span>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
