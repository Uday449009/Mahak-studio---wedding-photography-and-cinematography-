import { ComparisonRow, PackageId, STUDIO_CONTACTS } from '../data/studioData';

export interface BookingFormInput {
  fullName: string;
  phone: string;
  weddingDate: string;
  packageId: PackageId;
  city?: string;
}

export interface BookingValidationErrors {
  fullName?: string;
  phone?: string;
  weddingDate?: string;
  packageId?: string;
}

export interface BookingValidationResult {
  valid: boolean;
  normalizedPhone: string;
  errors: BookingValidationErrors;
}

const VALID_PACKAGES: readonly PackageId[] = ['basic', 'standard', 'premium', 'golden'];

/**
 * Normalizes an Indian mobile number input into its 10-digit canonical form
 * by stripping spaces, hyphens, parentheses, leading "+91", "91", or "0".
 */
export function normalizeIndianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

/**
 * Validates booking inquiry fields strictly without substituting silent fallbacks.
 */
export function validateBookingInput(
  input: BookingFormInput,
  todayIso: string = new Date().toISOString().slice(0, 10),
): BookingValidationResult {
  const errors: BookingValidationErrors = {};
  const trimmedName = input.fullName.trim();
  const normalizedPhone = normalizeIndianPhone(input.phone);

  if (trimmedName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile or WhatsApp number.';
  }

  if (!input.weddingDate || !/^\d{4}-\d{2}-\d{2}$/.test(input.weddingDate)) {
    errors.weddingDate = 'Please choose your wedding date.';
  } else if (input.weddingDate < todayIso) {
    errors.weddingDate = 'Wedding date cannot be in the past.';
  }

  if (!VALID_PACKAGES.includes(input.packageId)) {
    errors.packageId = 'Please select one of our four wedding packages.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    normalizedPhone,
    errors,
  };
}

/**
 * Formats an ISO date string (YYYY-MM-DD) into a readable editorial date (e.g. "18 Dec 2026").
 */
export function formatWeddingDate(dateIso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIso)) {
    return dateIso;
  }
  const [yearStr, monthStr, dayStr] = dateIso.split('-');
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthIdx = Number(monthStr) - 1;
  const dayNum = Number(dayStr);
  if (monthIdx < 0 || monthIdx > 11 || Number.isNaN(dayNum)) {
    return dateIso;
  }
  return `${dayNum} ${months[monthIdx]} ${yearStr}`;
}

/**
 * Generates a deterministic human-readable inquiry reference code.
 */
export function generateInquiryReference(fullName: string, weddingDate: string): string {
  const initials = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
    .replace(/[^A-Z]/g, '');

  const dateCompact = weddingDate.replace(/-/g, '').slice(0, 8) || '00000000';
  return `MHK-${dateCompact}-${initials || 'WD'}`;
}

/**
 * Builds a pre-filled WhatsApp booking URL targeting Raja Dangi's official studio number.
 */
export function buildWhatsAppBookingUrl(
  input: BookingFormInput,
  packageName: string,
  priceLabel: string,
): string {
  const normalizedPhone = normalizeIndianPhone(input.phone);
  const formattedDate = formatWeddingDate(input.weddingDate);
  const cityLine = input.city?.trim() ? `\nVenue City: ${input.city.trim()}` : '';

  const message = [
    'Namaste Mahak Studio!',
    `I would like to inquire about booking the ${packageName} Package (${priceLabel}).`,
    `Name: ${input.fullName.trim()}`,
    `Phone / WhatsApp: +91 ${normalizedPhone || input.phone.trim()}`,
    `Wedding Date: ${formattedDate}${cityLine}`,
  ].join('\n');

  return `${STUDIO_CONTACTS.raja.whatsappHref}?text=${encodeURIComponent(message)}`;
}

/**
 * Optionally filters comparison rows to only highlight rows where tiers differ in inclusion status
 * (e.g., upgrades introduced in Standard, Premium, or Golden).
 */
export function filterComparisonRows(
  rows: ComparisonRow[],
  upgradesOnly: boolean,
): ComparisonRow[] {
  if (!upgradesOnly) {
    return rows;
  }
  return rows.filter((row) => {
    const basicStatus = row.values.basic.included;
    return basicStatus === 'no';
  });
}
