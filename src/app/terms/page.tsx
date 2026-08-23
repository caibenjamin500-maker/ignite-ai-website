import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply to using the Ignite AI website and requesting a free audit, including how the 30-day guarantee works.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      summary="These terms cover the use of this website and the free audit. The paid work itself is governed by the written agreement we sign with each client."
    >
      <h2>Agreeing to these terms</h2>
      <p>
        By using igniteaiagents.com you agree to what is set out here. If you do
        not agree, please do not use the site. These terms are between you and{" "}
        {site.name}, {site.legalStructure} (&ldquo;{site.name}&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;).
      </p>

      <h2>What this website is</h2>
      <p>
        This site describes services we offer and lets you request a free audit.
        Nothing on it is an offer to enter a contract, and submitting the form
        does not create one. It starts a conversation.
      </p>
      <p>
        We may change, add to, or remove anything on this site at any time,
        including the services described, without notice.
      </p>

      <h2>The free audit</h2>
      <p>
        The audit is free and carries no obligation on either side. We will
        review how enquiries currently reach your business and where they stop,
        and give you our findings. You are free to act on those findings
        yourself, with someone else, or not at all.
      </p>
      <p>
        The audit is our opinion based on what you tell us and what we can
        observe in the time available. It is not a guarantee of any particular
        result, and it is not legal, financial, or tax advice.
      </p>
      <p>
        We take on a limited number of new builds each month. Requesting an
        audit does not reserve a place, and we may decline to take on any
        project.
      </p>

      <h2>Paid work</h2>
      <p>
        If you decide to work with us, that work is governed by a separate
        written agreement covering scope, fees, timelines, and what each of us
        is responsible for. Where that agreement and these terms disagree, the
        signed agreement wins.
      </p>

      <h2>The 30-day guarantee</h2>
      <p>
        We offer a guarantee on new builds. Because a guarantee is only
        meaningful if both sides know what it covers, here is how ours works.
      </p>
      <ol>
        <li>
          <strong>We agree the target in writing first.</strong> Before we begin
          building, we write down the specific, measurable outcome your system
          is meant to produce, and both of us sign off on it. If it is not
          written down before work starts, it is not covered.
        </li>
        <li>
          <strong>The clock starts when the system goes live</strong> — the day
          it begins handling real enquiries, not the day you sign.
        </li>
        <li>
          <strong>You need to hold up your side.</strong> The guarantee assumes
          you give us the access, information, and approvals the build needs,
          and that you do not switch off or bypass the system during the thirty
          days. If the system cannot run, we cannot stand behind what it
          produced.
        </li>
        <li>
          <strong>If the target is missed, we refund your setup fee.</strong>{" "}
          Tell us in writing within fourteen days of the thirty-day mark, and we
          refund the one-off setup fee you paid, in full, within thirty days.
        </li>
        <li>
          <strong>What the refund does not include.</strong> Monthly management
          fees for months already worked are not refunded, and neither are
          amounts paid to third parties on your behalf — phone numbers, message
          costs, software subscriptions and similar — since those are already
          spent.
        </li>
      </ol>
      <p>
        The guarantee is our sole remedy for a build that does not meet its
        agreed target.
      </p>

      <h2>No guarantee of revenue or results</h2>
      <p>
        Beyond the specific guarantee above, we do not promise any level of
        revenue, leads, bookings, or growth. What our systems produce depends on
        your market, your pricing, your team, your demand, and other things
        outside our control. Nothing on this site should be read as a prediction
        of what your business will earn.
      </p>

      <h2>Services we depend on</h2>
      <p>
        Our systems are built on third-party platforms — telephony providers,
        messaging providers, calendars, CRMs, and AI model providers among them.
        We choose these carefully but we do not control them. We are not
        responsible for their outages, price changes, or discontinuation, though
        we will work with you to find a replacement if one goes away.
      </p>

      <h2>Using this site</h2>
      <p>You agree not to:</p>
      <ul>
        <li>
          Submit the form with someone else&apos;s details, or with details you
          know to be false
        </li>
        <li>
          Attempt to break, overload, probe, or gain unauthorised access to the
          site or the systems behind it
        </li>
        <li>Use automated tools to submit the form or scrape the site</li>
        <li>Use the site for anything unlawful</li>
      </ul>

      <h2>Our content</h2>
      <p>
        The text, design, and code of this site belong to {site.name}. You may
        read and share it, but please do not copy it wholesale or present it as
        your own. The {site.name} name and logo are ours.
      </p>

      <h2>Disclaimer</h2>
      <p>
        This website is provided as it is. We do not warrant that it will always
        be available, that it will be free of errors, or that the information on
        it is complete or current. To the fullest extent the law allows, we
        disclaim implied warranties of merchantability, fitness for a particular
        purpose, and non-infringement in relation to the site.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent the law allows, {site.name} is not liable for
        indirect, incidental, special, or consequential losses arising from your
        use of this website — including lost profits, lost business, or lost
        data. Our total liability arising from your use of this website is
        limited to one hundred US dollars.
      </p>
      <p>
        This limit applies to the website. Liability in respect of paid work is
        dealt with in the signed agreement for that work. Nothing here excludes
        liability that cannot lawfully be excluded.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of South Carolina,
        without regard to its conflict-of-law rules. Any dispute arising from
        this website will be brought in the state or federal courts serving
        Greenville County, South Carolina, and both of us consent to those
        courts.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms. The date at the top of this page shows when
        they last changed, and continuing to use the site after a change means
        you accept the updated terms.
      </p>
    </LegalPage>
  );
}
