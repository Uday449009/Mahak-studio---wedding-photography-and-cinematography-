import { FormEvent, useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Instagram,
  MessageCircle,
  Phone,
  RotateCcw,
} from 'lucide-react';
import {
  PackageId,
  STUDIO_CONTACTS,
  STUDIO_IMAGES,
  WEDDING_PACKAGES,
} from '../data/studioData';
import {
  BookingValidationErrors,
  buildWhatsAppBookingUrl,
  formatWeddingDate,
  generateInquiryReference,
  validateBookingInput,
} from '../utils/booking';
import { ResilientImage } from './ResilientImage';

interface BookingAndSpotlightSectionProps {
  selectedPackageId: PackageId;
  onChangePackage: (packageId: PackageId) => void;
}

interface SubmittedInquiry {
  reference: string;
  fullName: string;
  normalizedPhone: string;
  weddingDate: string;
  packageName: string;
  priceLabel: string;
  city: string;
  whatsappUrl: string;
}

export function BookingAndSpotlightSection({
  selectedPackageId,
  onChangePackage,
}: BookingAndSpotlightSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [city, setCity] = useState('Indore');
  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [submitted, setSubmitted] = useState<SubmittedInquiry | null>(null);

  const selectedPackage =
    WEDDING_PACKAGES.find((p) => p.id === selectedPackageId) ?? WEDDING_PACKAGES[2];

  // If user switches package while viewing a previous confirmation, allow fresh inquiry
  useEffect(() => {
    if (submitted && submitted.packageName !== selectedPackage.name) {
      setSubmitted(null);
    }
  }, [selectedPackage.name, submitted]);

  const todayIso = new Date().toISOString().slice(0, 10);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateBookingInput(
      {
        fullName,
        phone,
        weddingDate,
        packageId: selectedPackageId,
        city,
      },
      todayIso,
    );

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const reference = generateInquiryReference(fullName, weddingDate);
    const whatsappUrl = buildWhatsAppBookingUrl(
      {
        fullName,
        phone: result.normalizedPhone,
        weddingDate,
        packageId: selectedPackageId,
        city,
      },
      selectedPackage.name,
      selectedPackage.priceLabel,
    );

    setSubmitted({
      reference,
      fullName: fullName.trim(),
      normalizedPhone: result.normalizedPhone,
      weddingDate,
      packageName: selectedPackage.name,
      priceLabel: selectedPackage.priceLabel,
      city: city.trim() || 'Indore',
      whatsappUrl,
    });
  }

  function handleResetForm() {
    setSubmitted(null);
    setErrors({});
  }

  return (
    <section className="bg-[#F7F3ED] py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        {/* Part 1: About MK Cinematic Spotlight Card */}
        <div
          id="about"
          className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#E5DACE] bg-white"
        >
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="h-full min-h-[340px] max-h-[470px] w-full bg-[#2D251E] lg:max-h-none lg:min-h-[430px]">
                <ResilientImage
                  src={STUDIO_IMAGES.mkCinematic}
                  alt="MK Cinematic, Lead Photographer and Video Creator at Mahak Studio holding a cinema camera rig inside a golden-lit heritage Indian wedding venue"
                  fallbackTitle="MK Cinematic · Lead Photographer & Video Creator"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-7">
              <div>
                <p className="text-sm font-medium text-[#B45309]">
                  Photographer &amp; Cinematography Spotlight
                </p>
                <h2
                  className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#1E1E1E] sm:text-4xl"
                  style={{ textWrap: 'balance' }}
                >
                  MK Cinematic — Lead Photographer &amp; Video Creator
                </h2>
                <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[#4A3F36]">
                  At the heart of Mahak Studio’s modern visual signature is MK Cinematic—crafting
                  high-impact wedding teasers, vertical Instagram reels, and unscripted candid
                  films that capture the real heartbeat of Indian weddings without stiff posing.
                </p>

                <dl className="mt-8 grid grid-cols-1 gap-5 border-t border-[#EDE4D8] pt-6 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-medium text-[#6B5E53]">Social Reels &amp; Teasers</dt>
                    <dd className="mt-1 text-sm font-semibold text-[#1E1E1E]">
                      3 Custom Instagram Reels + Cinematic Teaser
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-[#6B5E53]">Cinema Gear</dt>
                    <dd className="mt-1 text-sm font-semibold text-[#1E1E1E]">
                      4K Cinema Cameras, Gimbal &amp; Aerial Drone
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-[#6B5E53]">Follow Recent Films</dt>
                    <dd className="mt-1">
                      <a
                        href={STUDIO_CONTACTS.instagram.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B45309] underline-offset-4 hover:underline"
                      >
                        <Instagram className="h-4 w-4" aria-hidden="true" />
                        <span>{STUDIO_CONTACTS.instagram.handle}</span>
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#EDE4D8] pt-6 text-xs font-medium text-[#574B41] sm:text-sm">
                <span>Indore Based Crew</span>
                <span aria-hidden="true" className="text-[#C7B8A6]">
                  ·
                </span>
                <span>Indore, Ujjain &amp; Dewas Coverage</span>
                <span aria-hidden="true" className="text-[#C7B8A6]">
                  ·
                </span>
                <span>Organized RAW Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Direct Studio Contacts & Interactive Booking Inquiry Form */}
        <div
          id="contact"
          className="mt-12 scroll-mt-24 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10"
        >
          {/* Left: Direct Contacts */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-sm font-medium text-[#B45309]">Reserve Your Wedding Dates</p>
              <h2
                className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#1E1E1E] sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                Speak Directly with Raja Dangi &amp; Om Thakur
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4A3F36]">
                Wedding dates during peak Malwa auspicious seasons fill quickly. Call directly,
                start a WhatsApp chat, or submit your date below for an instant studio callback.
              </p>

              {/* Direct Contact Lines */}
              <div className="mt-8 divide-y divide-[#E5DACE] border-y border-[#E5DACE]">
                {/* Raja Dangi */}
                <div className="py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <p className="font-editorial text-xl font-semibold text-[#1E1E1E]">
                        {STUDIO_CONTACTS.raja.name}
                      </p>
                      <p className="text-xs text-[#6B5E53]">{STUDIO_CONTACTS.raja.role}</p>
                    </div>
                    <a
                      href={STUDIO_CONTACTS.raja.telHref}
                      className="text-base font-semibold text-[#B45309] tabular-nums underline-offset-4 hover:underline"
                    >
                      {STUDIO_CONTACTS.raja.displayPhone}
                    </a>
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-2.5">
                    <a
                      href={STUDIO_CONTACTS.raja.telHref}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#D8CBB8] bg-white px-4 py-2 text-xs font-semibold text-[#2D251E] transition-colors hover:border-[#B45309]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#B45309]" aria-hidden="true" />
                      <span>Call Raja</span>
                    </a>
                    <a
                      href={STUDIO_CONTACTS.raja.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#2D251E] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1E1813]"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-[#F5B041]" aria-hidden="true" />
                      <span>WhatsApp Raja</span>
                    </a>
                  </div>
                </div>

                {/* Om Thakur */}
                <div className="py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <p className="font-editorial text-xl font-semibold text-[#1E1E1E]">
                        {STUDIO_CONTACTS.om.name}
                      </p>
                      <p className="text-xs text-[#6B5E53]">{STUDIO_CONTACTS.om.role}</p>
                    </div>
                    <a
                      href={STUDIO_CONTACTS.om.telHref}
                      className="text-base font-semibold text-[#B45309] tabular-nums underline-offset-4 hover:underline"
                    >
                      {STUDIO_CONTACTS.om.displayPhone}
                    </a>
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-2.5">
                    <a
                      href={STUDIO_CONTACTS.om.telHref}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#D8CBB8] bg-white px-4 py-2 text-xs font-semibold text-[#2D251E] transition-colors hover:border-[#B45309]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#B45309]" aria-hidden="true" />
                      <span>Call Om Thakur</span>
                    </a>
                    <a
                      href={STUDIO_CONTACTS.om.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#D8CBB8] bg-white px-4 py-2 text-xs font-semibold text-[#2D251E] transition-colors hover:border-[#B45309]"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-[#B45309]" aria-hidden="true" />
                      <span>WhatsApp Om</span>
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex flex-wrap items-center justify-between gap-3 py-5">
                  <div>
                    <p className="text-xs font-medium text-[#6B5E53]">Official Instagram</p>
                    <p className="mt-0.5 text-base font-semibold text-[#1E1E1E]">
                      {STUDIO_CONTACTS.instagram.handle}
                    </p>
                  </div>
                  <a
                    href={STUDIO_CONTACTS.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#D8CBB8] bg-white px-4 py-2 text-xs font-semibold text-[#2D251E] transition-colors hover:border-[#B45309]"
                  >
                    <Instagram className="h-3.5 w-3.5 text-[#B45309]" aria-hidden="true" />
                    <span>View Reels</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#E5DACE] bg-white p-6 sm:p-9">
              {submitted ? (
                <div data-testid="booking-confirmation" className="space-y-6">
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#B45309]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#B45309] tabular-nums">
                        Inquiry Reference · {submitted.reference}
                      </p>
                      <h3 className="mt-1 font-editorial text-2xl font-semibold text-[#1E1E1E]">
                        Callback Request Ready for {submitted.fullName}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#574B41]">
                        Your wedding booking inquiry has been recorded below. Tap the WhatsApp
                        button to send your date and selected package directly to Raja Dangi for
                        immediate date-lock confirmation.
                      </p>
                    </div>
                  </div>

                  <dl className="grid grid-cols-1 gap-4 rounded-xl border border-[#EDE4D8] bg-[#FAF6EF] p-5 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-medium text-[#6B5E53]">Selected Package</dt>
                      <dd className="mt-1 text-sm font-semibold text-[#1E1E1E] tabular-nums">
                        {submitted.packageName} ({submitted.priceLabel})
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[#6B5E53]">Wedding Date</dt>
                      <dd className="mt-1 text-sm font-semibold text-[#1E1E1E] tabular-nums">
                        {formatWeddingDate(submitted.weddingDate)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[#6B5E53]">Phone / WhatsApp</dt>
                      <dd className="mt-1 text-sm font-semibold text-[#1E1E1E] tabular-nums">
                        +91 {submitted.normalizedPhone}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[#6B5E53]">Wedding City</dt>
                      <dd className="mt-1 text-sm font-semibold text-[#1E1E1E]">
                        {submitted.city}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href={submitted.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#B45309] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#92400E]"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Send Details on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[#D8CBB8] bg-white px-5 py-3 text-sm font-semibold text-[#2D251E] transition-colors hover:bg-[#FAF6EF]"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      <span>Edit Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-[#EDE4D8] pb-4">
                    <h3 className="font-editorial text-2xl font-semibold text-[#1E1E1E]">
                      Request a Wedding Booking Callback
                    </h3>
                    <p className="mt-1 text-sm text-[#574B41] tabular-nums">
                      Currently inquiring for{' '}
                      <span className="font-semibold text-[#B45309]">
                        {selectedPackage.name} ({selectedPackage.priceLabel})
                      </span>
                      {' · '}
                      {selectedPackage.summaryMeta}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="booking-full-name"
                        className="block text-sm font-medium text-[#2D251E]"
                      >
                        Full Name <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        id="booking-full-name"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        placeholder="e.g., Rohan & Meera Sharma"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                        className={`mt-1.5 block min-h-[46px] w-full rounded-lg border bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1E1E1E] placeholder:text-[#8E8072] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B45309]/30 ${
                          errors.fullName
                            ? 'border-[#DC2626]'
                            : 'border-[#D8CBB8] focus:border-[#B45309]'
                        }`}
                      />
                      {errors.fullName && (
                        <p id="error-full-name" role="alert" className="mt-1.5 text-xs font-medium text-[#DC2626]">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-sm font-medium text-[#2D251E]"
                      >
                        Phone / WhatsApp Number <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        id="booking-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="e.g., 98260 12345"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'error-phone' : undefined}
                        className={`mt-1.5 block min-h-[46px] w-full rounded-lg border bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1E1E1E] tabular-nums placeholder:text-[#8E8072] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B45309]/30 ${
                          errors.phone
                            ? 'border-[#DC2626]'
                            : 'border-[#D8CBB8] focus:border-[#B45309]'
                        }`}
                      />
                      {errors.phone && (
                        <p id="error-phone" role="alert" className="mt-1.5 text-xs font-medium text-[#DC2626]">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Wedding Date */}
                    <div>
                      <label
                        htmlFor="booking-date"
                        className="block text-sm font-medium text-[#2D251E]"
                      >
                        Wedding Date <span className="text-[#DC2626]">*</span>
                      </label>
                      <div className="relative mt-1.5">
                        <input
                          id="booking-date"
                          name="weddingDate"
                          type="date"
                          min={todayIso}
                          required
                          value={weddingDate}
                          onChange={(e) => {
                            setWeddingDate(e.target.value);
                            if (errors.weddingDate)
                              setErrors((prev) => ({ ...prev, weddingDate: undefined }));
                          }}
                          aria-invalid={Boolean(errors.weddingDate)}
                          aria-describedby={errors.weddingDate ? 'error-wedding-date' : undefined}
                          className={`block min-h-[46px] w-full rounded-lg border bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1E1E1E] tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B45309]/30 ${
                            errors.weddingDate
                              ? 'border-[#DC2626]'
                              : 'border-[#D8CBB8] focus:border-[#B45309]'
                          }`}
                        />
                      </div>
                      {errors.weddingDate && (
                        <p id="error-wedding-date" role="alert" className="mt-1.5 text-xs font-medium text-[#DC2626]">
                          {errors.weddingDate}
                        </p>
                      )}
                    </div>

                    {/* Wedding City */}
                    <div>
                      <label
                        htmlFor="booking-city"
                        className="block text-sm font-medium text-[#2D251E]"
                      >
                        Wedding Venue City
                      </label>
                      <input
                        id="booking-city"
                        name="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Indore, Ujjain, Dewas..."
                        className="mt-1.5 block min-h-[46px] w-full rounded-lg border border-[#D8CBB8] bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1E1E1E] placeholder:text-[#8E8072] focus:border-[#B45309] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B45309]/30"
                      />
                    </div>
                  </div>

                  {/* Package Selection Dropdown */}
                  <div>
                    <label
                      htmlFor="booking-package"
                      className="block text-sm font-medium text-[#2D251E]"
                    >
                      Package Selection <span className="text-[#DC2626]">*</span>
                    </label>
                    <select
                      id="booking-package"
                      name="packageId"
                      value={selectedPackageId}
                      onChange={(e) => onChangePackage(e.target.value as PackageId)}
                      className="mt-1.5 block min-h-[46px] w-full rounded-lg border border-[#D8CBB8] bg-[#FDFBF7] px-3.5 py-2.5 text-sm font-medium text-[#1E1E1E] tabular-nums focus:border-[#B45309] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B45309]/30"
                    >
                      {WEDDING_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — {pkg.priceLabel}
                          {pkg.isFeatured ? ' (Special Offer · Most Popular)' : ''}
                          {pkg.isRoyal ? ' (Grand Royal Tier)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#B45309] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#92400E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
                    >
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span>Request Booking Callback</span>
                    </button>
                    <p className="mt-3 text-center text-xs text-[#6B5E53]">
                      No advance payment needed to inquire · Instant WhatsApp confirmation link
                      generated upon submission.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
