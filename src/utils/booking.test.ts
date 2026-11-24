import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppBookingUrl,
  filterComparisonRows,
  formatWeddingDate,
  generateInquiryReference,
  normalizeIndianPhone,
  validateBookingInput,
} from './booking';
import { COMPARISON_ROWS } from '../data/studioData';

test('normalizeIndianPhone strips +91, spaces, dashes, and leading 0', () => {
  assert.equal(normalizeIndianPhone('+91 97536 51885'), '9753651885');
  assert.equal(normalizeIndianPhone('097536-51885'), '9753651885');
  assert.equal(normalizeIndianPhone('918305594823'), '8305594823');
  assert.equal(normalizeIndianPhone('98260 12345'), '9826012345');
});

test('validateBookingInput rejects empty fields with explicit messages', () => {
  const result = validateBookingInput(
    {
      fullName: ' ',
      phone: '',
      weddingDate: '',
      packageId: 'premium',
    },
    '2026-11-24',
  );

  assert.equal(result.valid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.weddingDate);
});

test('validateBookingInput rejects invalid Indian numbers and past wedding dates', () => {
  const result = validateBookingInput(
    {
      fullName: 'Rohan Sharma',
      phone: '1234567890',
      weddingDate: '2026-11-20',
      packageId: 'golden',
    },
    '2026-11-24',
  );

  assert.equal(result.valid, false);
  assert.equal(result.errors.fullName, undefined);
  assert.ok(result.errors.phone?.includes('10-digit'));
  assert.ok(result.errors.weddingDate?.includes('past'));
});

test('validateBookingInput accepts valid wedding booking inquiry', () => {
  const result = validateBookingInput(
    {
      fullName: 'Ananya Deshmukh',
      phone: '+91 98260 54321',
      weddingDate: '2026-12-18',
      packageId: 'premium',
    },
    '2026-11-24',
  );

  assert.equal(result.valid, true);
  assert.equal(result.normalizedPhone, '9826054321');
  assert.deepEqual(result.errors, {});
});

test('formatWeddingDate and generateInquiryReference produce clean editorial strings', () => {
  assert.equal(formatWeddingDate('2026-12-18'), '18 Dec 2026');
  assert.equal(generateInquiryReference('Rohan Sharma', '2026-12-18'), 'MHK-20261218-RS');
});

test('buildWhatsAppBookingUrl targets Raja Dangi with properly encoded details', () => {
  const url = buildWhatsAppBookingUrl(
    {
      fullName: 'Priya & Kabir',
      phone: '9826012345',
      weddingDate: '2026-12-18',
      packageId: 'premium',
      city: 'Indore',
    },
    'Premium',
    '₹60,000/-',
  );

  assert.ok(url.startsWith('https://wa.me/919753651885?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.ok(decoded.includes('Premium Package (₹60,000/-)'));
  assert.ok(decoded.includes('Priya & Kabir'));
  assert.ok(decoded.includes('18 Dec 2026'));
  assert.ok(decoded.includes('Indore'));
});

test('filterComparisonRows isolates upgrade-only features cleanly', () => {
  const all = filterComparisonRows(COMPARISON_ROWS, false);
  const upgrades = filterComparisonRows(COMPARISON_ROWS, true);
  assert.equal(all.length, 6);
  assert.equal(upgrades.length, 3);
  assert.deepEqual(
    upgrades.map((r) => r.id),
    ['candid-cinematic', 'teaser-reels', 'led-wall'],
  );
});
