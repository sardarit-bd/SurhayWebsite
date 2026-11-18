import PricingPage from '@/components/pages/PricingPage';
import { astroPathname } from '@/lib/props';

export default function Page() {
  return <PricingPage lang="tr" pathname={astroPathname('/tr/fiyatlar')} />;
}
