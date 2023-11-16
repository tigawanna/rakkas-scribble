export function numberToArray(num: number) {
  return Array.from({ length: num }, (_, index) => index + 1);
}

export const dateToString = (date?: Date | string) => {
  if (!date) {
    return new Date().toISOString().slice(0, 10);
  }
  if (date instanceof Date) {
    return date.toISOString().slice(0, 10);
    // return date.toDateString();
  }
  return new Date(date).toISOString().slice(0, 10);
};

export function removeDuplicatesFromArray(strings: string[]): string[] {
  const uniqueStrings: Set<string> = new Set(strings);
  return Array.from(uniqueStrings);
}

export function removeDuplicatesFromStringList(strings: string[]): string {
  const uniqueStrings: Set<string> = new Set();
  strings.forEach((s) => uniqueStrings.add(s));
  if (uniqueStrings.size < 1) return "";
  return Array.from(uniqueStrings).join(",");
}

export function isStringaUrl(link: string | undefined) {
  if (!link || !link.trim() || link.trim().length < 1) return false;
  try {
    new URL(link);
    return true;
  } catch (error) {
    return false;
  }
}
