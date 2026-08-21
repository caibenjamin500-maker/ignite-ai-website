import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What information Ignite AI collects through this website, why we collect it, who it is shared with, and how to ask us to delete it.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      summary="This site has one form on it. This page explains exactly what that form collects, where it goes, and how to get it removed."
    >
      <h2>Who we are</h2>
      <p>
        {site.name} is {site.legalName}, based in {site.location}. We are the
        party responsible for the information described on this page. You can
        reach us at{" "}
        <a href={`mailto:${site.email}`} className="link">
          {site.email}
        </a>
        .
      </p>

      <h2>What we collect</h2>

      <h3>Information you give us</h3>
      <p>
        When you submit the audit request form, we collect what you type into
        it:
      </p>
      <ul>
        <li>Your name</li>
        <li>Your business name</li>
        <li>Your email address</li>
        <li>Your phone number, if you choose to give one</li>
        <li>Anything you write in the free-text box</li>
        <li>
          Whether you ticked the box consenting to receive text messages from us
        </li>
      </ul>
      <p>
        Only your name, business name, and email address are required. The rest
        is optional and the form works without them.
      </p>

      <h3>Information collected automatically</h3>
      <p>
        This site is hosted on Vercel. Like any web host, Vercel records
        technical details of requests made to the site — including your IP
        address, the page requested, your browser and operating system, and the
        time of the request — in server logs it keeps on our behalf. We use
        these only to keep the site running and to investigate problems.
      </p>
      <p>
        When you submit the form, we also read your IP address in order to count
        how many submissions have come from it recently, so that automated
        systems cannot flood the form. That count is held briefly in memory and
        is never written to our lead records.
      </p>

      <h3>What we do not collect</h3>
      <p>
        <strong>
          This site sets no cookies, uses no advertising or analytics trackers,
          and stores nothing in your browser.
        </strong>{" "}
        There is no Google Analytics, no advertising pixel, no session recording
        and no cross-site tracking on this site. That is also why you were not
        asked to accept a cookie banner — there is nothing to consent to.
      </p>

      <h2>Why we collect it</h2>
      <dl>
        <dt>To respond to your request</dt>
        <dd>
          Your form submission exists so that we can contact you about the audit
          you asked for and prepare for that conversation.
        </dd>

        <dt>To keep in touch about your enquiry</dt>
        <dd>
          If you become a client, we use the same contact details to run the
          work. If you do not, we may follow up a small number of times about
          the enquiry you made. You can ask us to stop at any time and we will.
        </dd>

        <dt>To prevent abuse of the form</dt>
        <dd>
          We use your IP address, transiently, to rate-limit submissions.
        </dd>
      </dl>
      <p>
        We do not use your information to build advertising profiles, and we do
        not add you to unrelated marketing lists.
      </p>

      <h2>Who your information is shared with</h2>
      <p>
        We do not sell your personal information and we do not share it for
        anyone else&apos;s advertising. Your form submission is stored in tools
        we use to run the business:
      </p>
      <dl>
        <dt>Google</dt>
        <dd>
          Your submission is written to a Google Sheet through Google Apps
          Script, so that we have a record of enquiries.
        </dd>

        <dt>Notion</dt>
        <dd>
          A record is also created in our Notion workspace, which is where we
          track conversations with prospective clients.
        </dd>

        <dt>Vercel</dt>
        <dd>
          Vercel hosts this website and processes requests to it, including the
          server logs described above.
        </dd>
      </dl>
      <p>
        Each of these companies processes the information on our instructions
        and under its own privacy terms. We may also disclose information where
        the law requires it, or where it is necessary to establish or defend a
        legal claim.
      </p>

      <h2>Text messages</h2>
      <p>
        We only send you text messages if you tick the box on the form asking us
        to. Ticking it is optional — we will reply by email whether or not you
        do, and consent to texts is never a condition of working with us.
      </p>
      <p>
        If you do consent, messages will be about your audit and your enquiry
        with us. Message and data rates may apply, and message frequency varies.
        Reply <strong>STOP</strong> to any message to stop receiving them, or
        <strong> HELP</strong> for help. You can also simply email us and ask.
        We keep a record of whether you consented, and when, so that we can show
        we had permission.
      </p>

      <h2>How long we keep it</h2>
      <p>
        If you become a client, we keep your records for as long as we work
        together and for seven years afterwards, which covers our tax and
        accounting obligations.
      </p>
      <p>
        If you do not become a client, we keep your enquiry for up to two years
        so we have context if you come back to us, and then delete it. You can
        ask us to delete it sooner.
      </p>

      <h2>Your choices</h2>
      <p>
        Whatever state or country you are in, you can ask us to do any of the
        following, and we will:
      </p>
      <ul>
        <li>Tell you what information we hold about you</li>
        <li>Send you a copy of it</li>
        <li>Correct anything that is wrong</li>
        <li>Delete it</li>
        <li>Stop contacting you</li>
      </ul>
      <p>
        Email{" "}
        <a href={`mailto:${site.email}`} className="link">
          {site.email}
        </a>{" "}
        and we will action it within thirty days. We will not charge you for it
        and we will not treat you differently for asking. We may need to confirm
        you are who you say you are before we hand over or delete records.
      </p>
      <p>
        Depending on where you live, you may have additional rights under laws
        such as the California Consumer Privacy Act or the EU and UK General
        Data Protection Regulation. The list above is what we offer everyone
        regardless.
      </p>

      <h2>Security</h2>
      <p>
        This site is served over HTTPS. The credentials used to write to Google
        and Notion are held as server-side environment variables and are never
        sent to your browser. No system is perfectly secure, so please do not
        send us sensitive information — payment card details, government
        identification numbers, or health information — through the form. We
        never ask for those.
      </p>

      <h2>Children</h2>
      <p>
        This site is for business owners and is not directed at children. We do
        not knowingly collect information from anyone under 18. If you believe a
        child has submitted the form, email us and we will delete the record.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change what we collect or who we share it with, we will update
        this page and change the date at the top. Material changes will be
        described at the top of the page.
      </p>
    </LegalPage>
  );
}
