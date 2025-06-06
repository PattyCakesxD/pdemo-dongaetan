"use client";
import { createContext, useContext, useEffect, useState } from "react";

const SIDEBAR_KEY = "sidebar-expanded";

export const SidebarContext = createContext({
  expanded: true,
  setExpanded: (_: boolean) => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(SIDEBAR_KEY);
      if (stored !== null) setExpanded(stored === "true");
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SIDEBAR_KEY, String(expanded));
    }
  }, [expanded]);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
