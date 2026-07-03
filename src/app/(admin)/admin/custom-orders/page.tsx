import React from 'react';
import type { Metadata } from 'next';
import { AdminPageFrame } from '@/components/admin/admin-page-frame';
import { getCustomOrderRequests } from '@/actions/custom-orders';
import { CustomOrdersTable } from '@/components/admin/custom-orders-table';
import { AdminToolbar } from '@/components/admin/admin-toolbar';
import { isBuildPhase } from '@/lib/supabase/utils';

export const metadata: Metadata = { title: 'Custom Orders | Jupiter Admin' };



export default async function AdminCustomOrdersPage() {
  const orders = isBuildPhase() ? [] : await getCustomOrderRequests();
  return (
    <AdminPageFrame eyebrow="Orders" title="Custom Requests" description={`${orders.length} order requests`}>
      <div className="space-y-6">
        <AdminToolbar title="Request queue" description="Click a request to view details and update status." />
        <CustomOrdersTable orders={orders} />
      </div>
    </AdminPageFrame>
  );
}
