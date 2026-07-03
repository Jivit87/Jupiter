'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { AdminOrderActions } from '@/components/admin/order-actions';

type CustomOrder = {
  id: string;
  description: string;
  occasion: string | null;
  forWhom: string | null;
  budgetRange: string | null;
  deadline: string | null;
  materials: string[] | null;
  referenceUrl: string | null;
  customerName: string | null;
  customerPhone: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'declined';
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

type CustomOrdersTableProps = {
  orders: CustomOrder[];
};

const STATUS_LABELS: Record<string, React.ReactNode> = {
  pending: <span className="flex items-center"><i className="ri-time-line text-black mr-1.5 text-lg"></i> Pending</span>,
  in_progress: <span className="flex items-center"><i className="ri-loader-4-line text-black mr-1.5 text-lg"></i> In Progress</span>,
  completed: <span className="flex items-center"><i className="ri-checkbox-circle-fill text-black mr-1.5 text-lg"></i> Completed</span>,
  declined: <span className="flex items-center"><i className="ri-close-circle-fill text-gray-400 mr-1.5 text-lg"></i> Declined</span>,
};

export function CustomOrdersTable({ orders }: CustomOrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<CustomOrder | null>(null);

  return (
    <>
      <div className="overflow-x-auto rounded-sm border border-[#E5E7EB]">
        <table className="min-w-full text-sm">
          <thead className="bg-[#F9FAFB]">
            <tr>
              {['Status', 'Occasion', 'Budget', 'Description', 'Received'].map((col) => (
                <th key={col} className="border-b border-[#E5E7EB] px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.28em] text-[#4B5563]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-[#4B5563]">
                  No custom orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr 
                  key={o.id} 
                  onClick={() => setSelectedOrder(o)}
                  className="cursor-pointer border-b border-[#E5E7EB] last:border-0 hover:bg-[#F9FAFB] transition-colors"
                >
                  <td className="px-4 py-3 text-black whitespace-nowrap">{STATUS_LABELS[o.status] ?? o.status}</td>
                  <td className="px-4 py-3 text-[#4B5563] whitespace-nowrap">{o.occasion ?? '—'}</td>
                  <td className="px-4 py-3 text-[#4B5563] whitespace-nowrap">{o.budgetRange ?? '—'}</td>
                  <td className="max-w-xs px-4 py-3 text-black">
                    <span className="line-clamp-1">{o.description}</span>
                  </td>
                  <td className="px-4 py-3 text-[#4B5563] whitespace-nowrap">
                    {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-NP') : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        open={!!selectedOrder} 
        onOpenChange={(open) => !open && setSelectedOrder(null)}
        title="Custom Order Request"
        description={`Submitted on ${selectedOrder?.createdAt ? new Date(selectedOrder.createdAt).toLocaleDateString('en-NP') : 'Unknown Date'}`}
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-4 rounded-sm bg-[#F9FAFB] p-4 border border-[#E5E7EB]">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#4B5563] mb-1">Customer</p>
                <p className="text-black font-medium">{selectedOrder.customerName || 'Anonymous'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#4B5563] mb-1">WhatsApp</p>
                <p className="text-black font-medium">{selectedOrder.customerPhone || 'Not provided'}</p>
              </div>
            </div>

            {/* Request Details */}
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#4B5563] mb-1">Description</p>
                <p className="text-black leading-relaxed whitespace-pre-wrap">{selectedOrder.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#4B5563] mb-1">Occasion</p>
                  <p className="text-black">{selectedOrder.occasion || '—'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#4B5563] mb-1">Budget</p>
                  <p className="text-black">{selectedOrder.budgetRange || '—'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#4B5563] mb-1">Deadline</p>
                  <p className="text-black">{selectedOrder.deadline || '—'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#4B5563] mb-1">Materials</p>
                  <p className="text-black">{selectedOrder.materials?.join(', ') || '—'}</p>
                </div>
              </div>

              {selectedOrder.referenceUrl && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#4B5563] mb-1">Reference</p>
                  <a href={selectedOrder.referenceUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline inline-flex items-center">
                    <i className="ri-external-link-line mr-1"></i> View reference image
                  </a>
                </div>
              )}
            </div>

            <hr className="border-[#E5E7EB]" />

            {/* Admin Actions */}
            <div>
              <p className="text-xs uppercase tracking-wider text-[#4B5563] mb-3">Admin Actions</p>
              <AdminOrderActions 
                id={selectedOrder.id} 
                currentStatus={selectedOrder.status} 
                currentNotes={selectedOrder.adminNotes} 
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
