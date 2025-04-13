'use client';

import React, { Suspense } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { Home } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

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
      <Sidebar>
        <SidebarTrigger />
        <SidebarHeader>
          <Icons.logo className="h-6 w-auto" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/" onClick={() => setActiveTab('home')}>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/patient-dashboard" onClick={() => setActiveTab('patient-dashboard')}>
                  <Icons.user className="mr-2 h-4 w-4" />
                  <span>Patient Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/settings" onClick={() => setActiveTab('settings')}>
                  <Icons.settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/approve" onClick={() => setActiveTab('approve')}>
                  <Icons.shield className="mr-2 h-4 w-4" />
                  <span>Approve</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/payments" onClick={() => setActiveTab('payments')}>
                  <Icons.share className="mr-2 h-4 w-4" />
                  <span>Payments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-center text-xs">
            &copy; {new Date().getFullYear()} LabWise. All rights reserved.
          </p>
        </SidebarFooter>
      </Sidebar>

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
