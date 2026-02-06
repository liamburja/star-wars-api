export function parseNumber(value: string): number | undefined {
  if (!value || value === 'unknown' || value === 'n/a') {
    return undefined;
  }
  const parsed = parseInt(value.replace(/,/g, ''));
  return isNaN(parsed) ? undefined : parsed;
}

export function extractFinallyUrlNumber(url: string, type: string): number {
    const match = url.match(new RegExp(`\\/${type}\\/(\\d+)\\/`));
    return match ? parseInt(match[1], 10) : 0;
  }