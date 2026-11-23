import { altPaths, useTranslations } from "@/i18n/utils";
import Legal from "@/layouts/Legal";
import { astroPathname } from "@/lib/props";

export default function Page() {
  const lang = "en" as const;
  const t = useTranslations(lang);

  const address = [
    "Surhay Design",
    "Huseyin Surhay Yilmaz",
    "Kolonnenstrage 8",
    "10827 Berlin",
    "Germany",
  ];

  return (
    <Legal
      title={t("legal.imprint.title")}
      description={t("legal.imprint.desc")}
      kind="imprint"
      alternates={altPaths("imprint")}
      lang={lang}
      pathname={astroPathname("/en/imprint")}
    >
      <h2>Information pursuant to § 5 DDG</h2>
      <p dangerouslySetInnerHTML={{ __html: address.join("<br />") }} />

      <h2>Contact</h2>
      <p>
        Email:{" "}
        <a href="mailto:hallo@surhay-design.de">hallo@surhay-design.de</a>
        <br />
        Phone: +49 1525 1780665
      </p>

      <h2>VAT</h2>
      <p>
        Value-added tax identification number pursuant to § 27a UStG:
        DE460132065
      </p>

      <h2>Responsible for content pursuant to § 18 Para. 2 MStV</h2>
      <p>Huseyin Surhay Yilmaz, address as above</p>

      <h2>Consumer dispute resolution / universal arbitration body</h2>
      <p>
        We are not willing or obliged to participate in dispute resolution
        procedures before a consumer arbitration body.
      </p>

      <h2>Liability for content</h2>
      <p>
        As a service provider, we are responsible for our own content on these
        pages in accordance with § 7 (1) DDG and general legislation. According
        to §§ 8 to 10 DDG, however, we are not obliged to monitor transmitted or
        stored third-party information or to investigate circumstances that
        indicate illegal activity. Obligations to remove or block the use of
        information under general legislation remain unaffected. Liability in
        this respect is only possible from the point in time at which we become
        aware of a specific infringement. Upon becoming aware of such
        infringements, we will remove the content in question immediately.
      </p>

      <h2>Liability for links</h2>
      <p>
        Our website contains links to external third-party websites over whose
        content we have no influence. We therefore cannot accept any liability
        for this third-party content. The respective provider or operator of the
        linked pages is always responsible for their content. The linked pages
        were checked for possible legal violations at the time of linking; no
        illegal content was identifiable. Upon becoming aware of legal
        infringements, we will remove such links immediately.
      </p>

      <h2>Copyright</h2>
      <p>
        The content and works created by the site operators on these pages are
        subject to German copyright law. Duplication, processing, distribution
        and any form of commercialisation beyond the scope of copyright law
        require the written consent of the respective author or creator.
        Downloads and copies of this site are permitted for private,
        non-commercial use only.
      </p>
    </Legal>
  );
}
