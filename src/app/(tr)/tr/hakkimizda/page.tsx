import AboutPage from '@/components/pages/AboutPage';
import { astroPathname } from '@/lib/props';

export default function Page() {
  return <AboutPage lang="tr" pathname={astroPathname('/tr/hakkimizda')} />;
}
