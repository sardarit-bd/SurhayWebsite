import ProcessPage from '@/components/pages/ProcessPage';
import { astroPathname } from '@/lib/props';

export default function Page() {
  return <ProcessPage lang="tr" pathname={astroPathname('/tr/surec')} />;
}
