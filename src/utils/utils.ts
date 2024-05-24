export function getFullImageUrl(relativeUrl: string): string {
  const baseUrl: string = import.meta.env.VITE_IMAGE_BASE_URL || "";
  return `${baseUrl}${relativeUrl}`;
}
