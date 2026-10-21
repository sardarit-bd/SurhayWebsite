import { homePaths } from "@/i18n/utils";
import Base from "@/layouts/Base";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import Studio from "@/components/sections/Studio";
import Pricing from "@/components/sections/Pricing";
import Insights from "@/components/sections/Insights";
import Faq from "@/components/sections/Faq";
import ContactCta from "@/components/ContactCta";
import IndustrySlider from "@/components/sections/IndustrySlider";
import { astroPathname } from "@/lib/props";
import BlogPreview from "@/components/sections/BlogPreview";
export default function Page() {
  const lang = "de" as const;
  const pathname = astroPathname("/");
  return (
    <Base alternates={homePaths()} lang={lang} pathname={pathname}>
      <Hero lang={lang} />
      <Services lang={lang} />
      <TrustBar lang={lang} />
      <Work lang={lang} />
      <Process lang={lang} />
      <IndustrySlider lang={lang} />
      <Studio lang={lang} />
      <Pricing lang={lang} />
      <Insights lang={lang} />
      <BlogPreview lang={lang} />
      <Faq lang={lang} />
      <ContactCta lang={lang} />
    </Base>
  );
}