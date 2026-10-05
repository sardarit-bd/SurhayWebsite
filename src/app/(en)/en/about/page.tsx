import AboutPage from '@/components/pages/AboutPage';
import { astroPathname } from '@/lib/props';
export default function Page() {
  return <AboutPage lang="en" pathname={astroPathname('/en/about')} />;
}
