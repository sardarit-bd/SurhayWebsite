import type { ReactNode } from "react";
import Document from "@/layouts/Document";
import MaintenanceGate from "@/components/maintenance/MaintenanceGate";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Document lang="de">
      {/* <MaintenanceGate> */}
        {children}
        {/* </MaintenanceGate> */}
    </Document>
  );
}
