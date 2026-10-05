import ProcessPage from '@/components/pages/ProcessPage';
import { astroPathname } from '@/lib/props';
export default function Page() {
  return <ProcessPage lang="en" pathname={astroPathname('/en/process')} />;
}
