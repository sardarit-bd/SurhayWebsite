import ContactPage from '@/components/pages/ContactPage';
import { astroPathname } from '@/lib/props';

export default function Page() {
  return <ContactPage lang="en" pathname={astroPathname('/en/contact')} />;
}
