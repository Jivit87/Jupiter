import type { Metadata } from 'next';
import { AdminPageFrame } from '@/components/admin/admin-page-frame';
import { getSiteSettings } from '@/actions/settings';
import { AdminSettingsForm } from '@/components/admin/settings-form';
import { isBuildPhase } from '@/lib/supabase/utils';

export const metadata: Metadata = { title: 'Settings | Jupiter Admin' };

export default async function AdminSettingsPage() {
  const settings = isBuildPhase() ? {} : await getSiteSettings();
  return (
    <AdminPageFrame eyebrow="Settings" title="Settings" description="Configure site-wide content and contact info.">
      <AdminSettingsForm settings={settings} />
    </AdminPageFrame>
  );
}
