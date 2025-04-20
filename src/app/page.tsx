// File: app/page.tsx or appropriate route file
'use client';

import React, { Suspense } from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { AppSidebar } from '@/components/AppSidebar';

const DynamicPatientDashboard = dynamic(() => import('@/components/PatientDashboard'), {
  suspense: true,
  ssr: false,
});
const DynamicSettings = dynamic(() => import('@/components/Settings'), {
  suspense: true,
  ssr: false,
});
const DynamicApprove = dynamic(() => import('@/components/Approve'), {
  suspense: true,
  ssr: false,
});
const DynamicPayments = dynamic(() => import('@/components/Payments'), {
  suspense: true,
  ssr: false,
});

export default function IndexPage() {
  const { state } = useSidebar();
  const [activeTab, setActiveTab] = React.useState<'home' | 'patient-dashboard' | 'settings' | 'approve' | 'payments'>('home');

  return (
    <div className="flex h-screen">
      <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={cn(
        "flex-1 p-4",
        state === 'collapsed' ? 'ml-[3rem]' : 'ml-64',
        "transition-all duration-200 ease-linear"
      )}>
        <Suspense fallback={<p>Loading dashboard...</p>}>
          {activeTab === 'patient-dashboard' && <DynamicPatientDashboard />}
          {activeTab === 'settings' && <DynamicSettings />}
          {activeTab === 'approve' && <DynamicApprove />}
          {activeTab === 'payments' && <DynamicPayments />}
          {activeTab === 'home' && <p>Welcome to LabWise!</p>}
        </Suspense>
      </div>
    </div>
  );
}