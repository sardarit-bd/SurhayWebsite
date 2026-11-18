import FaqPage from '@/components/pages/FaqPage';
import { astroPathname } from '@/lib/props';

export default function Page() {
  return <FaqPage lang="tr" pathname={astroPathname('/tr/sss')} />;
}
