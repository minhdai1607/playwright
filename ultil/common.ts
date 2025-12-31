import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path';
export function generateTestEmail(opts?: {
  prefix?: string;
  domain?: string;
  suffixLength?: number;
}): string {
  const prefix = opts?.prefix ?? 'test';
  const domain = opts?.domain ?? 'gmail.com';
  const suffixLength = typeof opts?.suffixLength === 'number' ? opts!.suffixLength : 6;

  const now = new Date();
  const ts = now.toISOString().replace(/[:.TZ-]/g, '');
  const rand = randomBytes(Math.ceil(suffixLength / 2)).toString('hex').slice(0, suffixLength);

  return `${prefix}-${ts}-${rand}@${domain}`;
}

export function generateRandomPhoneNumber(opts?: {
  country?: 'vn' | 'custom';
  length?: number;
  customPrefixes?: string[];
  withCountryCode?: boolean;
}): string {
  const country = opts?.country ?? 'vn';

  const randDigits = (n: number) => {
    let s = '';
    for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10).toString();
    return s;
  };

  if (country === 'vn') {
    const prefixes = [
      '03', '05', '07', '08', '09',
    ];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    return prefix + randDigits(8);
  } else {
    const prefixes = opts?.customPrefixes ?? ['+1'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const total = opts?.length ?? 10;
    const prefixDigitsOnly = prefix.replace(/\D/g, '');
    const digitsNeeded = Math.max(0, total - prefixDigitsOnly.length);
    const number = randDigits(digitsNeeded);
    return (opts?.withCountryCode ? prefix : prefix.replace('+', '0')) + number;
  }
}

export function generateRandomBankAccountNumber(length = 12): string {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('length must be a positive integer');
  }
  let s = '';
  for (let i = 0; i < length; i++) s += Math.floor(Math.random() * 10).toString();
  if (s[0] === '0') {
    s = (Math.floor(Math.random() * 9) + 1).toString() + s.slice(1);
  }
  return s;
}
export function generateName(opts?: { locale?: 'en' | 'vi'; withLastName?: boolean }): string {
  const locale = opts?.locale ?? 'en';
  const withLastName = opts?.withLastName ?? true;

  let firstNames: string[], lastNames: string[];

  if (locale === 'vi') {
    firstNames = ['An', 'Bảo', 'Chi', 'Duy', 'Hà', 'Khanh', 'Lan', 'Minh', 'Ngọc', 'Quân', 'Thiên'];
    lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Huỳnh', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ'];
  } else {
    firstNames = ['John', 'Alice', 'Michael', 'Emily', 'David', 'Sophia', 'James', 'Olivia', 'Daniel', 'Chloe'];
    lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Wilson', 'Lee', 'Martin', 'Clark', 'Lewis', 'Walker'];
  }

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return withLastName ? `${firstName} ${lastName}` : firstName;
}


export function readWalletAddresses(filename:string): string[] {
  const filePath = path.resolve(
    __dirname,
    '../document/'+filename+'.txt'
  );

  const content = fs.readFileSync(filePath, 'utf-8');

  return content
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => line.split(' - ')[1]?.trim())
    .filter(Boolean);
}