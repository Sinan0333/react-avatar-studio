export function cx(...names: (string | undefined | null | false)[]): string | undefined {
  return names.filter(Boolean).join(' ') || undefined;
}
