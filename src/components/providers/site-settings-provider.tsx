'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SiteSettingsState } from '@/lib/site-settings';

const SiteSettingsContext = createContext<SiteSettingsState | null>(null);

type SiteSettingsProviderProps = {
  settings: SiteSettingsState;
  children: ReactNode;
};

export function SiteSettingsProvider({ settings, children }: SiteSettingsProviderProps) {
  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
