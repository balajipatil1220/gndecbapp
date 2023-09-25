import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

export function camelCaseToCapitalized(str: string) {
  // Check if the string has any white spaces
  if (/\s/.test(str)) {
    return str;
  }

  // Insert space before each capital letter using a regular expression
  const capitalizedStr = str.replace(/([A-Z])/g, ' $1');
  return capitalizedStr.charAt(0).toUpperCase() + capitalizedStr.slice(1);
}
