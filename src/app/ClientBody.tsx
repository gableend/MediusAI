"use client";

import { useEffect } from "react";
import SideNav from "@/components/SideNav";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    document.body.className = "antialiased";
  }, []);

  return (
    <div className="antialiased">
      {children}
      <SideNav />
    </div>
  );
}
