import PricingPage from '@/components/pages/PricingPage';
import { astroPathname } from '@/lib/props';
export default function Page() {
  return <PricingPage lang="en" pathname={astroPathname('/en/pricing')} />;
}
