/**
 * Single source of truth for the handful of facts that appear in more than
 * one place (footer, legal pages, form copy, metadata). Change them here.
 */
export const site = {
  name: "Ignite AI",
  /**
   * How the business is legally constituted, written as a phrase that can be
   * dropped straight into a sentence after the trading name. Update this if
   * the business incorporates (e.g. "a South Carolina limited liability
   * company").
   */
  legalStructure: "a sole proprietorship of Cai Benjamin",
  owner: "Cai Benjamin",
  /**
   * The host this site is actually served from.
   *
   * Vercel redirects the bare apex to www, so www is the real home. Every
   * canonical tag, og:url, sitemap entry and robots.txt line is generated from
   * this value — if it names the apex, we tell Google to index a URL that
   * immediately redirects, which is a contradictory signal. Keep this matching
   * whatever Vercel actually serves.
   */
  url: "https://www.igniteaiagents.com",
  email: "caibenjamin500@gmail.com",
  location: "Greenville, South Carolina",
  /** Reviewed and published date for the legal pages. */
  legalUpdated: "August 21, 2026",
} as const;

/**
 * How many new builds are taken on each month. Shown in the hero.
 */
export const MONTHLY_BUILD_SLOTS = 3;

/**
 * The current month, in the business's own timezone rather than the server's.
 *
 * The homepage sets `revalidate`, so the rendered page is regenerated on a
 * schedule and this rolls over on its own at the start of each month — there
 * is no date to remember to edit.
 */
export function currentMonth(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: "America/New_York",
  }).format(now);
}
