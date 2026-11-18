import WorkIndexPage from '@/components/pages/WorkIndexPage';
import { astroPathname } from '@/lib/props';

export default function Page() {
  return <WorkIndexPage lang="tr" pathname={astroPathname('/tr/projeler')} />;
}
