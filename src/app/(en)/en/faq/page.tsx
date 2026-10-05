import FaqPage from '@/components/pages/FaqPage';
import { astroPathname } from '@/lib/props';
export default function Page() {
  return <FaqPage lang="en" pathname={astroPathname('/en/faq')} />;
}
