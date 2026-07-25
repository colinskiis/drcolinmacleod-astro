/**
 * Route Inventory
 * Single source of truth for the service, condition, and lab testing page paths.
 *
 * These lists drive navigation highlighting (BaseLayout) and default breadcrumbs
 * (HeroSection). Adding or removing a page means editing this file only.
 *
 * All paths carry a trailing slash to match `trailingSlash: 'always'` in
 * astro.config.mjs — linking without one costs a 301 redirect.
 */

export const servicePaths = [
  '/acupuncture/',
  '/chelation-therapy/',
  '/clinical-nutrition/',
  '/digestive-health-testing/',
  '/glutathione/',
  '/herbal-medicine/',
  '/hormone-testing/',
  '/iv-therapy/',
  '/iv-vitamin-c/',
  '/l-carnitine/',
  '/lab-testing/',
  '/microcurrent-therapy/',
  '/myers-cocktail-intravenous-nutrients/',
  '/nad-therapy/',
  '/neural-prolotherapy-pain/',
  '/nutrient-testing/',
  '/prolotherapy/',
  '/prolotherapy-for-arthritis/',
  '/prolotherapy-for-back-pain/',
  '/prolotherapy-for-tendon-injuries/',
  '/specialized-testing/',
  '/sports-medicine/',
  '/thyroid-testing/',
  '/trace-minerals/',
  '/wellness-blood-work/',
] as const;

export const conditionPaths = [
  '/achilles-tendinitis/',
  '/carpal-tunnel-syndrome/',
  '/chronic-fatigue-syndrome/',
  '/fibromyalgia/',
  '/frozen-shoulder/',
  '/golfers-elbow/',
  '/herniated-disc/',
  '/low-back-pain/',
  '/migraine-headache/',
  '/osteoarthritis/',
  '/plantar-fasciitis/',
  '/rotator-cuff-shoulder-impingement/',
  '/runners-knee/',
  '/si-joint-dysfunction/',
  '/tennis-elbow/',
  '/tmj-dysfunction/',
  '/whiplash-neck-pain/',
] as const;

export const labTestingPaths = [
  '/digestive-health-testing/',
  '/hormone-testing/',
  '/nutrient-testing/',
  '/specialized-testing/',
  '/thyroid-testing/',
  '/wellness-blood-work/',
] as const;

export function isServicePath(path: string): boolean {
  return (servicePaths as readonly string[]).includes(path);
}

export function isConditionPath(path: string): boolean {
  return (conditionPaths as readonly string[]).includes(path);
}

export function isLabTestingPath(path: string): boolean {
  return (labTestingPaths as readonly string[]).includes(path);
}
