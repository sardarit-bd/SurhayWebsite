import ServicesPage from '@/components/pages/ServicesPage';
import { astroPathname } from '@/lib/props';
export default function Page() {
  return <ServicesPage lang="tr" pathname={astroPathname('/tr/hizmetler')} />;
}
