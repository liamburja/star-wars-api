export function parseNumber(value: string): number | undefined {
  if (!value || value === 'unknown' || value === 'n/a') {
    return undefined;
  }
  const parsed = parseInt(value.replace(/,/g, ''));
  return isNaN(parsed) ? undefined : parsed;
}

export function extractCharacterNumber(url: string): number {
    const match = url.match(/\/people\/(\d+)\//);
    return match ? parseInt(match[1], 10) : 0;
  }