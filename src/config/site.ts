/**
 * Site Configuration
 * Centralized configuration for URLs, contact info, and site metadata
 */

export const siteConfig = {
  // Site Info
  name: "Dr. Colin MacLeod ND",
  tagline: "Naturopathic Doctor",
  description: "Halifax Naturopathic Doctor providing comprehensive natural healthcare solutions including IV therapy, prolotherapy, acupuncture, and clinical nutrition.",

  // URLs
  url: "https://drcolinmacleod.com",
  bookingUrl: "https://macleodnaturopathic.janeapp.com/",

  // Location
  location: {
    city: "Halifax",
    province: "Nova Scotia",
    country: "CA",
  },

  // Analytics
  googleAnalyticsId: "G-HWHX5T8PEG",

  // Social (add as needed)
  social: {
    // twitter: "",
    // instagram: "",
    // facebook: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
