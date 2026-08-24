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
  /**
   * The number that answers. `phone` is what people read; `phoneHref` is what
   * a tel: link dials. Keep both in step with the number on the Google
   * Business Profile — search engines cross-check the two, and a mismatch
   * costs local ranking.
   */
  phone: "(864) 702-2295",
  phoneHref: "tel:+18647022295",
  location: "Greenville, South Carolina",
  /** Reviewed and published date for the legal pages. */
  legalUpdated: "August 21, 2026",
} as const;

/**
 * How many new builds are taken on each month. Shown in the hero.
 */
export const MONTHLY_BUILD_SLOTS = 3;

/**
 * Founding-client offer. This is scarcity that is actually true and
 * checkable — a real cohort, a real reason for the discount — which is why
 * it persuades where a bare "3 slots left" does not. Set to 0 once the
 * cohort is full and the banner removes itself.
 */
export const FOUNDING_SLOTS = 3;

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
