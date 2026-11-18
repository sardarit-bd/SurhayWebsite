'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/inter';
import { MAINTENANCE, isAllowedPath } from '../../maintenance.config';
import MaintenanceScreen from './MaintenanceScreen';

export default function MaintenanceGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (!MAINTENANCE.enabled || isAllowedPath(pathname)) {
    return <>{children}</>;
  }
  return <MaintenanceScreen />;
}