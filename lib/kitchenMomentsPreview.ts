// This opt-in applies only to a Vercel Preview deployment, never Production.
export function isKitchenMomentsPreview(): boolean {
  return process.env.VERCEL_ENV === 'preview'
    && process.env.KITCHEN_MOMENTS_PREVIEW === '1';
}
