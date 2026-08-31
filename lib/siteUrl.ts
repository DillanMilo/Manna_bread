const DEFAULT_SITE_URL = 'https://mannabread.com';

export function getSiteUrl(): string {
  // Deployment hostnames must not become the public canonical by default.
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) return DEFAULT_SITE_URL;

  try {
    const url = new URL(
      /^[a-z][a-z\d+.-]*:/i.test(configuredUrl)
        ? configuredUrl
        : `https://${configuredUrl}`,
    );

    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      return DEFAULT_SITE_URL;
    }

    // Every caller appends root-relative paths, so omit paths and trailing slashes.
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}
