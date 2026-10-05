import { homePaths } from '@/i18n/utils';
import Base from '@/layouts/Base';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import Services from '@/components/sections/Services';
import Work from '@/components/sections/Work';
import Process from '@/components/sections/Process';
import Studio from '@/components/sections/Studio';
import Pricing from '@/components/sections/Pricing';
import Insights from '@/components/sections/Insights';
import Faq from '@/components/sections/Faq';
import ContactCta from '@/components/ContactCta';
import { astroPathname } from '@/lib/props';

/** Tuerkische Startseite — identische Sektionsfolge, siehe src/app/(de)/page.tsx. */
export default function Page() {
  const lang = 'tr' as const;
  const pathname = astroPathname('/tr');

  return (
    <Base alternates={homePaths()} lang={lang} pathname={pathname}>
      <Hero lang={lang} />
      <Services lang={lang} />
      <TrustBar lang={lang} />
      <Work lang={lang} />
      <Process lang={lang} />
      <Studio lang={lang} />
      <Pricing lang={lang} />
      <Insights lang={lang} />
      <Faq lang={lang} />
      <ContactCta lang={lang} />
    </Base>
  );
}